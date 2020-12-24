import express from "express";
import { commentController } from "../../../controllers/main-controllers";
import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/commentOnPost",
  helpers.checkAuth,
  validator.commentValidator.commentOnPost,
  commentController.commentOnPost
);

router.post(
  "/deleteComment",
  helpers.checkAuth,
  commentController.deleteComment
);

router.post(
  "/getCommentsByPost",
  helpers.checkAuth,
  commentController.getCommentsByPost
);

export default router;
