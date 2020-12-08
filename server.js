import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import socket_io from "socket.io";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import fs from "fs";
import path from "path";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import createError from "http-errors";
const logger = require("morgan");
let socket = require("./socket");

colors.enable();
dotenv.config({ path: ".env" });

// Connect to database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error(err));

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(err.message);
});

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("autoIndex", false);

const app = express();
const io = socket_io();

import { userController } from "./controllers/main-controllers";

app.io = io;

app.set("socketio", io);
socket(io);

// Enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

import usersRouter from "./routes/api/user/user";
import postsRouter from "./routes/api/post/post";
import reactionsRouter from "./routes/api/reaction/reaction";
import commentsRouter from "./routes/api/comment/comment";
import publicRouter from "./routes/public";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
});

app.use(helmet());
if (process.env.NODE_ENV === "production") {
  app.use(limiter);
  app.use(
    logger("common", {
      stream: fs.createWriteStream("./access.log", { flags: "a" }),
    })
  );
} else {
  app.use(logger("dev"));
}
app.use(express.static("public"));
app.get("/404", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "NotFound.html"));
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user/", usersRouter);
app.use("/api/post/", postsRouter);
app.use("/api/reaction/", reactionsRouter);
app.use("/api/comment/", commentsRouter);
app.use("/api/", publicRouter);

// Swagger
const options = {
  explorer: true,
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.get("/auth/reset/password/:jwt", function (req, res) {
  return res.status(404).json({ message: "go to port 3000" });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = process.env.NODE_ENV === "development" ? err : {};
  //   console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// App routes
// AppRoutes(app);

module.exports = app;
