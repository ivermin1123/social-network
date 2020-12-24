import mongoose from "mongoose";
import _ from "lodash";
import { checkObjectIDs } from "../utils/db-check";

import "../models/Post";
import "../models/Reaction";
import "../models/Comment";
import POST from "./POST";
import COMMENT from "./COMMENT";

const Post = mongoose.model("Post");
const Reaction = mongoose.model("Reaction");
const Comment = mongoose.model("Comment");

const likePost = async ({ postId, type, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(postId))
        reject({ error: true, message: "param_invalid_1" });

      const infoPost = await Post.findById(postId);
      if (!infoPost) {
        return reject("post_not_found");
      }

      const listReaction = await Reaction.find({ post: postId });
      let checkLike = false;
      let isUpdate = { update: false, id: null };
      listReaction.forEach((reaction) => {
        if (reaction.author == userId) {
          if (reaction.type != type) {
            isUpdate.update = true;
            isUpdate.id = reaction._id;
          }
          checkLike = true;
        }
      });

      if (checkLike) {
        if (isUpdate.update) {
          await Reaction.findByIdAndUpdate(
            isUpdate.id,
            {
              type,
            },
            { new: true }
          );
          await POST.getPostById({ postId })
            .then((data) => {
              resolve(data[0]);
            })
            .catch((error) => {
              reject(error.message);
            });
        } else {
          const reaction = listReaction.filter(
            (reaction) => reaction.author == userId
          );
          const infoPostAfterUnlike = await Post.findByIdAndUpdate(
            postId,
            { $pull: { reactions: reaction[0]._id } },
            { new: true }
          );

          const infoPost = await POST.getPostById({
            postId: infoPostAfterUnlike._id,
          }).catch((error) => {
            reject(error.message);
          });

          await Reaction.deleteOne({ _id: reaction[0]._id })
            .then(() => {
              resolve(infoPost[0]);
            })
            .catch((error) => {
              reject(error.message);
            });
        }
      } else {
        let newReaction = new Reaction({
          author: userId,
          post: postId,
          type,
        });

        const infoNewReaction = await newReaction.save().catch((error) => {
          reject({ error: true, message: error.message });
        });

        const infoAfterUpdate = await Post.findByIdAndUpdate(
          postId,
          {
            $push: { reactions: infoNewReaction._id },
          },
          { new: true }
        );

        await POST.getPostById({ postId: infoAfterUpdate._id })
          .then((data) => {
            resolve(data[0]);
          })
          .catch((error) => {
            reject(error.message);
          });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const likeComment = async ({ postId, commentId, type, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(commentId))
        return reject({ error: true, message: "param_invalid_1" });

      const infoPost = await Comment.findById(commentId);
      if (!infoPost) {
        return reject("comment_not_found");
      }

      const listReaction = await Reaction.find({ comment: commentId });
      let checkLike = false;
      let isUpdate = { update: false, id: null };
      listReaction.forEach((reaction) => {
        if (reaction.author == userId) {
          if (reaction.type != type) {
            isUpdate.update = true;
            isUpdate.id = reaction._id;
          }
          checkLike = true;
        }
      });

      if (checkLike) {
        if (isUpdate.update) {
          await Reaction.findByIdAndUpdate(
            isUpdate.id,
            {
              type,
            },
            { new: true }
          );
          await COMMENT.getCommentsByPost({ postId })
            .then((data) => {
              return resolve(data);
            })
            .catch((error) => {
              return reject(error.message);
            });
        } else {
          const reaction = listReaction.filter(
            (reaction) => reaction.author == userId
          );
          await Comment.findByIdAndUpdate(
            commentId,
            { $pull: { reactions: reaction[0]._id } },
            { new: true }
          );

          const infoPost = await COMMENT.getCommentsByPost({
            postId,
          }).catch((error) => {
            return reject(error.message);
          });

          await Reaction.deleteOne({ _id: reaction[0]._id })
            .then(() => {
              return resolve(infoPost);
            })
            .catch((error) => {
              return reject(error.message);
            });
        }
      } else {
        let newReaction = new Reaction({
          author: userId,
          comment: commentId,
          type,
        });

        const infoNewReaction = await newReaction.save().catch((error) => {
          return reject({ error: true, message: error.message });
        });

        await Comment.findByIdAndUpdate(
          commentId,
          {
            $push: { reactions: infoNewReaction._id },
          },
          { new: true }
        );

        await COMMENT.getCommentsByPost({ postId })
          .then((data) => {
            return resolve(data);
          })
          .catch((error) => {
            return reject(error.message);
          });
      }
    } catch (error) {
      return reject(error);
    }
  });
};

const countReaction = async ({ typeId, typeReact }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let matchType = {};
      switch (typeReact) {
        case "post":
          matchType = {
            $match: {
              post: mongoose.Types.ObjectId(typeId),
            },
          };
          break;
        case "comment":
          matchType = {
            $match: {
              comment: mongoose.Types.ObjectId(typeId),
            },
          };
          break;
      }
      await Reaction.aggregate([
        matchType,
        { $group: { _id: "$type", amount: { $sum: 1 } } },
        {
          $sort: { _id: 1 },
        },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

export default { countReaction, likePost, likeComment };
