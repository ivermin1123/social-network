import mongoose from "mongoose";
import { checkObjectIDs } from "../utils/db-check";

import "../models/Post";
import "../models/Comment";
import POST from "./POST";
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

const commentOnPost = async ({ postId, parent, content, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(postId)) return reject("param_invalid");

      let infoComment;
      if (!parent) {
        const newComment = new Comment({
          content,
          author: userId,
          post: postId,
        });

        infoComment = await newComment.save().catch((error) => {
          return reject(error.message);
        });
      } else {
        const newComment = new Comment({
          content,
          author: userId,
          post: postId,
          parent,
        });

        infoComment = await newComment.save().catch((error) => {
          return reject(error.message);
        });

        await Comment.findByIdAndUpdate(
          parent,
          {
            $push: { children: infoComment._id },
          },
          { new: true }
        ).catch((error) => {
          return reject(error.message);
        });
      }

      await Post.findByIdAndUpdate(
        postId,
        {
          $push: { comments: infoComment._id },
        },
        { new: true }
      ).catch((error) => {
        return reject(error.message);
      });

      await POST.getPostById({ postId }).then((data) => {
        resolve(data);
      });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const deleteComment = async ({ postId, commentId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoComment = await Comment.findById(commentId).catch((error) => {
        return reject(error.message);
      });
      if (infoComment.author != userId) return reject("ACCESS DENIED.");

      await Comment.deleteOne({ _id: commentId }).catch((error) => {
        return reject(error.message);
      });

      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: commentId },
        },
        { new: true }
      ).catch((error) => {
        return reject(error.message);
      });

      await POST.getPostById({ postId }).then((data) => {
        resolve(data);
      });
    } catch (error) {
      return reject(error.message);
    }
  });
};

export default { commentOnPost, deleteComment };
