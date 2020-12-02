import express from "express";
import { postController } from "../../../controllers/main-controllers";
import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/commentOnPost",
  helpers.checkAuth,
  validator.postValidator.commentOnPost,
  postController.commentOnPost
);

export default router;
