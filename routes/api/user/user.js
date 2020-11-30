import express from "express";
import { userController } from "../../../controllers/main-controllers";

import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.post("/signup", validator.userValidator.addUser, userController.addUser);

router.post(
  "/login",
  validator.userValidator.loginUser,
  helpers.verificationCheck.verificationCheck,
  userController.loginUser,
  userController.sendUserData
);

export default router;
