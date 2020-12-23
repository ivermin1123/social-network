import express from "express";
import { reactionController } from "../../../controllers/main-controllers";
import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/likePost",
  helpers.checkAuth,
  validator.reactionValidator.likePost,
  reactionController.likePost
);

router.post(
  "/likeComment",
  helpers.checkAuth,
  validator.reactionValidator.likeComment,
  reactionController.likeComment
);

router.get(
  "/countReaction",
  helpers.checkAuth,
  validator.reactionValidator.countReaction,
  reactionController.countReaction
);

export default router;
