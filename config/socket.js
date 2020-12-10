import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisAdapter from "socket.io-redis";
import MESSAGE from "../database/MESSAGE";
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
  const sockets = {};
  io.use(async (socket, next) => {
    const { id: socketID } = socket;
    arraySocketConnect.push(socketID);
    // console.log(socket);
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
        console.log("next---------------------");
      });
    } else {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
        console.log("next---------------------");
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
      //   console.log(clients);
      // });
      sockets[socket.io] = socket;
      const { id: socketID } = socket;
      console.log(`New client connected ${socketID}`.rainbow);
      //   console.log({ socket });

      socket.on("CSS_JOIN", ({ name, room }, callback) => {
        console.log("JOIN", { name, room });
        const { error, user } = addUser({ id: socket.id, name, room });
        if (user) {
          socket.join(user.room);
          socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcome to room ${user.room}.`,
          });
          socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined!`,
          });

          io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }

        //   callback();
      });

      socket.on("TEST_VL", (data, callback) => {
        console.log(data);
      });

      socket.on(
        "CSS_SEND_MESSAGE",
        async ({ message, conversationOpen, type, userId }, callback) => {
          const user = getUser(socket.id);
          const infoMessage = await MESSAGE.sendMessage({
            conversationId: conversationOpen,
            message,
            type,
            userId,
          });
          let dataSendClient;
          if (infoMessage.error) {
            dataSendClient = infoMessage.message;
          } else {
            dataSendClient = infoMessage.data;
          }
          io.to(user.room).emit("SSC_SEND_MESSAGE", {
            infoMessage,
          });

          //   callback();
        }
      );

      socket.on("stoppedTyping", (data) => {
        //   arraySocketConnect.forEach(socket_=>{
        // 	 socket.to(data.userId).emit("stoppedTyping", { roomId: data.roomId });
        //   }})
      });
      socket.on("disconnect", () => {
        console.log(`bye ${socketID}`);
        delete sockets[socket.id];
        const user = removeUser(socket.id);

        if (user) {
          io.to(user.room).emit("message", {
            user: "Admin",
            text: `${user.name} has left.`,
          });
          io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      });
    });
}

export default ApplySocketIO;
