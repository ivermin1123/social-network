import express from "express";
import { friendRequestController } from "../../controllers/main-controllers";
import { helpers, validator } from "../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/sendFriendRequest",
  helpers.checkAuth,
  validator.friendRequestValidator.sendFriendRequest,
  friendRequestController.sendFriendRequest
);

router.post(
  "/acceptFriendRequest",
  helpers.checkAuth,
  validator.friendRequestValidator.friendRequest,
  friendRequestController.acceptFriendRequest
);

router.post(
  "/unfriend",
  helpers.checkAuth,
  validator.friendRequestValidator.unfriend,
  friendRequestController.unfriend
);

export default router;
