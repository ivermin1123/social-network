import mongoose from "mongoose";
import { checkObjectIDs } from "../../utils/db-check";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinary";

import "../../models/Post";
import "../../models/Comment";

const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

export const commentPost = async (req, res) => {
  try {
    const { postId, parent, content } = req.body;
    const { userId } = req.userData;

    if (!checkObjectIDs(postId))
      res.status(500).json({ error: true, message: "param_invalid" });

    let infoComment;
    if (!parent) {
      const newComment = new Comment({
        content,
        author: userId,
        post: postId,
      });

      infoComment = await newComment.save().catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
    } else {
      const newComment = new Comment({
        content,
        author: userId,
        post: postId,
        parent,
      });

      infoComment = await newComment.save().catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });

      await Comment.findByIdAndUpdate(
        parent,
        {
          $push: { childrens: infoComment._id },
        },
        { new: true }
      ).catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
    }

    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: infoComment._id },
      },
      { new: true }
    )
      .then((post) => {
        res.status(200).json({ error: false, data: post });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
