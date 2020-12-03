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

export default router;
