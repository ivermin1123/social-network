import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisAdapter from "socket.io-redis";
import MESSAGE from "../database/MESSAGE";
import USER from "../database/USER";
import NOTIFY from "../database/NOTIFY";
import { REDIS_SEPARATOR } from "./redis";
import mongoose from "mongoose";
import "../models/User";

const bluebird = require("bluebird");
const redis = require("redis");

const usersConnectedInstance = require("./global_scope").GlobalStore;
let usersConnected = usersConnectedInstance.usersOnline;

dotenv.config({ path: ".env" });
const arraySocketConnect = [];

const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

function ApplySocketIO(io) {
  bluebird.promisifyAll(redis);

  let pub = redis.createClient({
    host: REDIS_SEPARATOR.HOST,
    port: REDIS_SEPARATOR.PORT,
    auth_pass: REDIS_SEPARATOR.PWD,
  });

  let sub = redis.createClient({
    host: REDIS_SEPARATOR.HOST,
    port: REDIS_SEPARATOR.PORT,
    auth_pass: REDIS_SEPARATOR.PWD,
  });

  io.adapter(
    redisAdapter({
      pubClient: pub,
      subClient: sub,
    })
  );
  const sockets = {};
  io.use(async (socket, next) => {
    const { id: socketID } = socket;
    arraySocketConnect.push(socketID);
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", async (socket) => {
    await USER.updateStatus({
      userId: socket.userData.userId,
      isOffline: false,
    });
    sockets[socket.userData.userId] = socket;
    const { id: socketID } = socket;
    console.log(`New client connected ${socketID}`.rainbow);

    socket.on("CSS_JOIN", ({ name, room }, callback) => {
      console.log("JOIN", { name, room });
      const { error, user } = addUser({
        id: socket.id,
        name,
        room,
        userId: socket.userData.userId,
      });
      if (user) {
        socket.join(user.room);
      }

      //   callback();
    });

    socket.on(
      "CSS_LIKE_POST",
      async (
        { notifyBy, notifyTo, type, postId, reactType, isLike },
        callback
      ) => {
        //   console.log({ notifyBy, notifyTo, type, postId, reactType });
        if (isLike) {
          await NOTIFY.notifyTo({
            notifyBy,
            notifyTo,
            type,
            postId,
          });
          if (sockets[socket.userData.userId]) {
            io.to(sockets[socket.userData.userId]).emit("SSC_LIKE_POST", {
              notifyBy,
              notifyTo,
              type,
              postId,
              data,
              reactType,
            });
          }
        }
      }
    );

    socket.on(
      "CSS_SEND_MESSAGE",
      async ({ message, conversationId, type, userId }, callback) => {
        const user = getUser(socket.id);
        console.log({ message, conversationId, type, userId, user });
        const infoMessage = await MESSAGE.sendMessage({
          conversationId,
          message,
          type,
          userId,
        });
        io.to(user.room).emit("SSC_SEND_MESSAGE", {
          data: infoMessage,
        });

        //   callback();
      }
    );

    socket.on("stoppedTyping", (data) => {
      //   arraySocketConnect.forEach(socket_=>{
      // 	 socket.to(data.userId).emit("stoppedTyping", { roomId: data.roomId });
      //   }})
    });
    socket.on("disconnect", async () => {
      console.log(`bye ${socketID}`);
      //   socket.leave(socket.userData.userId);
      await USER.updateStatus({
        userId: socket.userData.userId,
        isOffline: true,
      });

      delete sockets[socket.id];
      const user = removeUser(socket.id);
    });
  });
}

export default ApplySocketIO;
