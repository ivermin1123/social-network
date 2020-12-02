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

export default router;
