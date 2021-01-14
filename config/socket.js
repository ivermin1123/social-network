import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisAdapter from "socket.io-redis";
import MESSAGE from "../database/MESSAGE";
import USER from "../database/USER";
import NOTIFY from "../database/NOTIFY";
import { REDIS_SEPARATOR } from "./redis";
import mongoose from "mongoose";
import "../models/User";

const User = mongoose.model("User");

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

const replaceExist = (arr, userId, socketID, username) => {
  let newArr;
  let isExist = arr.find((item) => Object.is(item.username, username)); // kiểm tra tồn tại

  if (isExist) {
    let arrWithoutExist = arr.filter(
      (item) => !Object.is(item.username, username)
    );
    newArr = [
      ...arrWithoutExist,
      {
        userId,
        socketID: [...isExist.socketID, socketID],
        username,
      },
    ];
  } else {
    newArr = [
      ...arr,
      {
        userId,
        socketID: [socketID],
        username,
      },
    ];
  }
  return newArr;
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const anAsyncFunction = async (item) => {
  let infoUser = await User.findById(item.userId);
  delete infoUser.password;
  return { ...item, infoUser };
};

const mapInfoUser = async (arrs, username) => {
  let arrsWithOutOwner = arrs.filter(
    (item) => !Object.is(item.username, username)
  );
  return await Promise.all(
    arrsWithOutOwner.map((item) => anAsyncFunction(item))
  );
};

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
  let listUser = [];
  io.use(async (socket, next) => {
    const { id: socketID } = socket;
    arraySocketConnect.push(socketID);
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
      });
    } else {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
      });
      // next(new Error("Authentication error"));
    }
    next();
  })
    //.of("/api/socket.io")
    .on("connection", (socket) => {
      // Connection now authenticated to receive further events
      // socket.join(socket.userData.userId);
      // io.in(socket.userData.userId).clients((err, clients) => {
      //   //userController.changeStatus(socket.userData.userId, clients, io);
      // });
      socket.on("CSS_LOGIN", async (data) => {
        // saving userId to object with socket ID
        listUser.push({
          socketID: socket.id,
          userId: data.userId,
        });
        await USER.updateStatus({ userId: data.userId, isOffline: false });
      });
      const { id: socketID } = socket;
      console.log(`New client connected ${socketID}`.rainbow);

      socket.on("CSS_JOIN", ({ name, room }, callback) => {
        console.log("JOIN", { name, room });
        const { error, user } = addUser({ id: socket.id, name, room });
        if (user) {
          socket.join(user.room);
          //   socket.emit("message", {
          //     user: "admin",
          //     text: `${user.name}, welcome to room ${user.room}.`,
          //   });
          //   socket.broadcast.to(user.room).emit("message", {
          //     user: "admin",
          //     text: `${user.name} has joined!`,
          //   });

          //   io.to(user.room).emit("roomData", {
          //     room: user.room,
          //     users: getUsersInRoom(user.room),
          //   });
        }

        //   callback();
      });

      socket.on(
        "CSS_SEND_MESSAGE",
        async ({ message, conversationId, type, userId }, callback) => {
          const infoMessage = await MESSAGE.sendMessage({
            conversationId,
            message,
            type,
            userId,
          });

          io.to(conversationId).emit("SSC_SEND_MESSAGE", {
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
            }).then((data) => {
              listUser.forEach((user) => {
                if (user.userId == notifyTo) {
                  io.to(user.socketID).emit("SSC_LIKE_POST", {
                    notifyBy,
                    notifyTo,
                    type,
                    postId,
                    data,
                    reactType,
                  });
                }
              });
            });
          }
        }
      );

      socket.on("disconnect", async () => {
        console.log(`bye ${socketID}`);
        // remove saved socket from users object
        listUser = listUser.filter(
          (user) => user.userId != socket.userData.userId
        );
        await USER.updateStatus({
          userId: socket.userData.userId,
          isOffline: true,
        });

        // const userToDelete = users.filter(
        //   (user) => user.userId == socket.userData.userId
        // );
        // delete users[socketID];
      });
    });
}

export default ApplySocketIO;
