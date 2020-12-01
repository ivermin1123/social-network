import express from "express";
import { postController } from "../../../controllers/main-controllers";
import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/addPost",
  helpers.checkAuth,
  validator.postValidator.createPost,
  postController.createPost
);

router.post(
  "/getPost",
  helpers.checkAuth,
  validator.postValidator.getPost,
  postController.getPost
);

router.post(
  "/likePost",
  helpers.checkAuth,
  validator.postValidator.likePost,
  postController.likePost
);

export default router;
