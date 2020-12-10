require("dotenv").config();
const _session_key = process.env.SESSION_SECRET_KEY || "s3cr3t@K3y!4@24#91";
const session = require("express-session");
const redisStore = require("connect-redis")(session);
import { CLIENT_REDIS } from "./redis";

export default function (app) {
  let ses = session({
    secret: _session_key,
    store: new redisStore({
      // host: 'localhost', port: 6379, client: client, ttl: 10 * 24 * 60 * 60,
      client: CLIENT_REDIS,
    }),
    saveUninitialized: false,
    resave: false,
  });

  app.use(ses);

  return ses;
}
