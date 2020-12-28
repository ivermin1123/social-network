import express from "express";
import { userController } from "../../controllers/main-controllers";
import { helpers, validator } from "../../middleware/main-middleware";

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

router.post(
  "/updateUserImage",
  helpers.checkAuth,
  userController.updateUserImage
);

router.post(
  "/changePassword",
  helpers.checkAuth,
  validator.userValidator.changePassword,
  userController.changePassword
);

export default router;
