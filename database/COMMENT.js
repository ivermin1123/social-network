import mongoose from "mongoose";
import { checkObjectIDs } from "../utils/db-check";

import "../models/Post";
import "../models/Comment";
import POST from "./POST";
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

const commentLookup = [
  {
    $lookup: {
      from: "users",
      let: { author: "$author" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$author"] } },
        },
        {
          $lookup: {
            from: "files",
            localField: "avatar",
            foreignField: "_id",
            as: "avatar",
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            createdAt: 1,
            username: 1,
            avatar: 1,
          },
        },
      ],
      as: "author",
    },
  },
  {
    $lookup: {
      from: "reactions",
      let: { reactions: "$reactions" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$reactions"] } },
        },
        {
          $lookup: {
            from: "users",
            let: { author: "$author" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$author"] } },
              },
              {
                $lookup: {
                  from: "files",
                  localField: "avatar",
                  foreignField: "_id",
                  as: "avatar",
                },
              },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  createdAt: 1,
                  username: 1,
                  avatar: 1,
                },
              },
            ],
            as: "author",
          },
        },
      ],
      as: "reactions",
    },
  },
  {
    $lookup: {
      from: "posts",
      localField: "post",
      foreignField: "_id",
      as: "post",
    },
  },
  {
    $lookup: {
      from: "comments",
      let: { children: "$children" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$children"] } },
        },
        {
          $lookup: {
            from: "users",
            let: { author: "$author" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$author"] } },
              },
              {
                $lookup: {
                  from: "files",
                  localField: "avatar",
                  foreignField: "_id",
                  as: "avatar",
                },
              },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  createdAt: 1,
                  username: 1,
                  avatar: 1,
                },
              },
            ],
            as: "author",
          },
        },
        {
          $lookup: {
            from: "reactions",
            let: { reactions: "$reactions" },
            pipeline: [
              {
                $match: { $expr: { $in: ["$_id", "$$reactions"] } },
              },
              {
                $lookup: {
                  from: "users",
                  let: { author: "$author" },
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ["$_id", "$$author"] } },
                    },
                    {
                      $lookup: {
                        from: "files",
                        localField: "avatar",
                        foreignField: "_id",
                        as: "avatar",
                      },
                    },
                    {
                      $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        createdAt: 1,
                        username: 1,
                        avatar: 1,
                      },
                    },
                  ],
                  as: "author",
                },
              },
            ],
            as: "reactions",
          },
        },
      ],
      as: "children",
    },
  },
];

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

      await getCommentsByPost({ postId }).then((data) => {
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

      await getCommentsByPost({ postId })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const getCommentsByPost = async ({ postId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Comment.aggregate([
        {
          $match: {
            $and: [{ post: mongoose.Types.ObjectId(postId) }, { parent: null }],
          },
        },
        ...commentLookup,
        {
          $sort: { createdAt: 1 },
        },
      ])
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};
export default { commentOnPost, deleteComment, getCommentsByPost };
