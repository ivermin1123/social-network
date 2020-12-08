import socket_io from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const io = socket_io();
dotenv.config({ path: ".env" });
let arraySocketConnect = [];

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

function ApplySocketIO(app) {
  app.io = io;

  app.set("socketio", io);
  let interval;
  io.use((socket, next) => {
    const { id: socketID } = socket;
    arraySocketConnect.push(socketID);
    if (socket.handshake.query && socket.handshake.query.user.token) {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
        console.log("next---------------------");
        next();
      });
    } else {
      const token = socket.handshake.query.token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = decoded;
        console.log("next---------------------");
        next();
      });
      // next(new Error("Authentication error"));
    }
    next();
  }).on("connection", (socket) => {
    // Connection now authenticated to receive further events
    //   socket.join(socket.userData.userId);
    //   io.in(socket.userData.userId).clients((err, clients) => {
    //     userController.changeStatus(socket.userData.userId, clients, io);
    //     //console.log(clients);
    //   });

    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    const { id: socketID } = socket;

    socket.on("typing", (data) => {
      console.log("hhhhh-=----");
      console.log({ arraySocketConnect });
      arraySocketConnect.forEach((socket_) => {
        console.log(socket_);
        io.to(socket_).emit("typing_c", { data: 1 });
      });
    });

    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to room ${user.room}.`,
      });
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name} has joined!` });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("CSS_SEND_MESSAGE", (msg) => {
      console.log("message: " + msg);
    });
    socket.on("stoppedTyping", (data) => {
      //   arraySocketConnect.forEach(socket_=>{
      // 	 socket.to(data.userId).emit("stoppedTyping", { roomId: data.roomId });
      //   }})
    });
    socket.on("disconnect", () => {
      console.log(`bye ${socketID}`);
      clearInterval(interval);
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

  const getApiAndEmit = (socket) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };
}

export default ApplySocketIO;
