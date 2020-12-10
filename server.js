import express from "express";
import colors from "colors";
import ApplySocketIO from "./config/socket";
import AppRouter from "./config/route";
import ApplyMiddleware from "./config/middleware";
import cookieParser from "cookie-parser";
import connectMongoDB from "./config/database";
import { REDIS_SEPARATOR } from "./config/redis";
import sessionConfig from "./config/session";
const sio_redis = require("socket.io-redis");
require("dotenv").config();
const debug = require("debug")("http");
const http = require("http");

colors.enable();

/**
 * Create Server
 */
const app = express();
const server = http.createServer(app);

/**
 * Connect database
 */
connectMongoDB();

/**
 * Session
 */
sessionConfig(app);

/**
 * Cookie
 */
app.use(cookieParser());

/**
 * Socket IO
 */
const options = {
  //path: "/api/socket.io",
  transports: ["websocket"],
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(server, options);
// io.path("/api/socket.io");
io.adapter(
  sio_redis({
    host: REDIS_SEPARATOR.HOST,
    port: REDIS_SEPARATOR.PORT,
    auth_pass: REDIS_SEPARATOR.PWD,
  })
);
ApplySocketIO(io);
/**
 * Middleware
 */
ApplyMiddleware(app, express);

/**
 * Router
 */
AppRouter(app);

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || process.env.API_PORT);
app.set("port", port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-");
  console.log(`API + Socket listening on port ${port}`.rainbow);
  console.log("-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-");
}

module.exports = app;
