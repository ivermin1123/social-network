import express from "express";
import { postController } from "../../controllers/main-controllers";
import { helpers, validator } from "../../middleware/main-middleware";

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

router.get("/getPosts", helpers.checkAuth, postController.getPosts);

router.post("/getUserPosts", helpers.checkAuth, postController.getUserPosts);

router.post("/deletePost", helpers.checkAuth, postController.deletePost);

router.post(
  "/editPost",
  helpers.checkAuth,
  validator.postValidator.editPost,
  postController.editPost
);

export default router;
