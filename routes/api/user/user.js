import express from "express";
import { userController } from "../../../controllers/main-controllers";
import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.post("/signup", validator.userValidator.addUser, userController.addUser);

router.post(
  "/login",
  validator.userValidator.loginUser,
  helpers.verificationCheck,
  userController.loginUser,
  userController.sendUserData
);

router.post(
  "/getUser",
  helpers.checkAuth,
  validator.userValidator.getUser,
  userController.getUser
);

export default router;
