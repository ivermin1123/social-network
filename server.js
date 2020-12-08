import express from "express";
import path from "path";
import colors from "colors";

import ApplySocketIO from "./config/socket";
import AppRouter from "./config/route";
import ApplyMiddleware from "./config/middleware";
import connectMongoDB from "./config/database";

colors.enable();

//DB
connectMongoDB();
const app = express();
// socket_io
ApplySocketIO(app);
//Middleware
ApplyMiddleware(app, express);
// Route
AppRouter(app);

module.exports = app;
