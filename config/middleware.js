import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
const logger = require("morgan");
dotenv.config({ path: ".env" });
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
});

function ApplyMiddleware(app, express) {
  // Enable cors
  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  };

  app.use(cors(corsOptions));

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
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

export default ApplyMiddleware;
