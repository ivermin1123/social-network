import mongoose from "mongoose";
import _ from "lodash";
import { checkObjectIDs } from "../utils/db-check";

import "../models/Post";
import "../models/Reaction";

const Post = mongoose.model("Post");
const Reaction = mongoose.model("Reaction");

const likePost = async ({ postId, type, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(postId))
        reject({ error: true, message: "param_invalid" });

      const infoPost = await Post.findById(postId);
      if (!infoPost) reject({ error: true, message: "post_not_found" });

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
          const rs = await Reaction.findByIdAndUpdate(
            isUpdate.id,
            {
              type,
            },
            { new: true }
          );
          await Post.findById(postId)
            .populate({
              path: "author",
              select: "_id firstName lastName createdAt username avatar",
              populate: [{ path: "avatar" }],
            })
            .populate({
              path: "reactions",
              populate: [
                {
                  path: "author",
                  select: "_id firstName lastName createdAt username avatar",
                  populate: [{ path: "avatar" }],
                },
                { path: "post" },
              ],
            })
            .populate({
              path: "comments",
              populate: [
                {
                  path: "author",
                  select: "_id firstName lastName createdAt username avatar",
                  populate: [{ path: "avatar" }],
                },
                {
                  path: "reactions",
                  populate: [
                    {
                      path: "author",
                      select:
                        "_id firstName lastName createdAt username avatar",
                      populate: [{ path: "avatar" }],
                    },
                    { path: "comment" },
                  ],
                },
              ],
              options: { sort: { createdAt: -1 } },
            })
            .populate({
              path: "files",
            })
            .then((post) => {
              resolve({ error: false, data: post });
            })
            .catch((error) => {
              reject({ error: true, message: error.message });
            });
        } else {
          const reaction = listReaction.filter(
            (reaction) => reaction.author == userId
          );
          const infoPostAfterUnlike = await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { reactions: reaction[0]._id } },
            { new: true }
          )
            .populate({
              path: "author",
              select: "_id firstName lastName createdAt username avatar",
              populate: [{ path: "avatar" }],
            })
            .populate({
              path: "reactions",
              populate: [
                {
                  path: "author",
                  select: "_id firstName lastName createdAt username avatar",
                  populate: [{ path: "avatar" }],
                },
                { path: "post" },
              ],
            })
            .populate({
              path: "comments",
              populate: [
                {
                  path: "author",
                  select: "_id firstName lastName createdAt username avatar",
                  populate: [{ path: "avatar" }],
                },
                {
                  path: "reactions",
                  populate: [
                    {
                      path: "author",
                      select:
                        "_id firstName lastName createdAt username avatar",
                      populate: [{ path: "avatar" }],
                    },
                    { path: "comment" },
                  ],
                },
              ],
              options: { sort: { createdAt: -1 } },
            })
            .populate({
              path: "files",
            });

          if (!infoPostAfterUnlike)
            reject({ error: true, message: "cannot_update" });
          await Reaction.deleteOne({ _id: reaction[0]._id })
            .then((reaction) => {
              resolve({ error: false, data: infoPostAfterUnlike });
            })
            .catch((error) => {
              reject({ error: true, message: error.message });
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

        await Post.findByIdAndUpdate(
          postId,
          {
            $push: { reactions: infoNewReaction._id },
          },
          { new: true }
        )
          .populate({
            path: "author",
            select: "_id firstName lastName createdAt username avatar",
            populate: [{ path: "avatar" }],
          })
          .populate({
            path: "reactions",
            populate: [
              {
                path: "author",
                select: "_id firstName lastName createdAt username avatar",
                populate: [{ path: "avatar" }],
              },
              { path: "post" },
            ],
          })
          .populate({
            path: "comments",
            populate: [
              { path: "author" },
              {
                path: "reactions",
                populate: [{ path: "author" }, { path: "comment" }],
              },
            ],
            options: { sort: { createdAt: -1 } },
          })
          .populate({
            path: "files",
          })
          .then((post) => {
            resolve({ error: false, data: post });
          })
          .catch((error) => {
            reject({ error: true, message: error.message });
          });
      }
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

const countReaction = async ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Reaction.aggregate([
        {
          $match: {
            post: mongoose.Types.ObjectId(postId),
          },
        },
        { $group: { _id: "$type", amount: { $sum: 1 } } },
        {
          $sort: { _id: 1 },
        },
      ])
        .then((data) => {
          resolve({ error: false, data });
        })
        .catch((error) => {
          reject({ error: true, message: error.message });
        });
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

export default { countReaction, likePost };
