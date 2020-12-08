let arraySocketConnect = [];
module.exports = function (io) {
  io.use((socket, next) => {
    const { id: socketID } = socket;
    arraySocketConnect.push(socketID);
    //   console.log(socket.handshake.query);
    //   if (socket.handshake.query && socket.handshake.query.user.token) {
    //     const token = socket.handshake.query.token.split(" ")[1];
    //     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    //       if (err) return next(new Error("Authentication error"));
    //       socket.userData = decoded;
    //       console.log("next---------------------");
    //       next();
    //     });
    //   } else {
    //     const token = socket.handshake.query.token.split(" ")[1];
    //     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    //       if (err) return next(new Error("Authentication error"));
    //       socket.userData = decoded;
    //       console.log("next---------------------");
    //       next();
    //     });
    //     // next(new Error("Authentication error"));
    //   }
    next();
  }).on("connection", (socket) => {
    // Connection now authenticated to receive further events
    //   socket.join(socket.userData.userId);
    //   io.in(socket.userData.userId).clients((err, clients) => {
    //     userController.changeStatus(socket.userData.userId, clients, io);
    //     //console.log(clients);
    //   });
    const { id: socketID } = socket;

    socket.on("typing", (data) => {
      console.log("hhhhh-=----");
      console.log({ arraySocketConnect });
      arraySocketConnect.forEach((socket_) => {
        console.log(socket_);
        io.to(socket_).emit("typing_c", { data: 1 });
      });
    });
    socket.on("stoppedTyping", (data) => {
      //   arraySocketConnect.forEach(socket_=>{
      // 	 socket.to(data.userId).emit("stoppedTyping", { roomId: data.roomId });
      //   }})
    });
    socket.on("disconnect", () => {
      console.log(`bye ${socketID}`);
      // socket.leave(socket.userData.userId);
      // io.in(socket.userData.userId).clients((err, clients) => {
      //   userController.changeStatus(socket.userData.userId, clients, io);
      //   //console.log(clients);
      // });
    });
  });
};
