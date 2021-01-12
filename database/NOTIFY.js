import mongoose from "mongoose";
import "../models/Notification";
import { checkObjectIDs } from "../utils/db-check";

const Notification = mongoose.model("Notification");

const notifyLookup = [
  {
    $lookup: {
      from: "users",
      let: { notifyBy: "$notifyBy" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$notifyBy"] } },
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
      as: "notifyBy",
    },
  },
  {
    $lookup: {
      from: "users",
      let: { notifyTo: "$notifyTo" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$notifyTo"] } },
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
      as: "notifyTo",
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
      from: "reactions",
      localField: "reaction",
      foreignField: "_id",
      as: "reaction",
    },
  },
  {
    $lookup: {
      from: "friendrequests",
      localField: "friendRequest",
      foreignField: "_id",
      as: "friendRequest",
    },
  },
  {
    $lookup: {
      from: "comments",
      localField: "comment",
      foreignField: "_id",
      as: "comment",
    },
  },
];

const notifyTo = async ({
  notifyBy,
  notifyTo,
  type,
  postId,
  commentId,
  reactionId,
  commentReplyId,
  friendRequestId,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newNotify = new Notification({
        notifyBy,
        notifyTo,
        type,
      });

      switch (type) {
        // Like Post
        case 1:
          newNotify.post = postId;
        // Comment Post
        case 2:
          newNotify.post = postId;
          newNotify.comment = commentId;
        //Reaction Comment
        case 3:
          newNotify.comment = commentId;
          newNotify.reaction = reactionId;
        // Reply comment
        case 4:
          newNotify.comment = commentId;
          newNotify.commentReply = commentReplyId;
        // Like reply comment
        case 5:
          newNotify.commentReply = commentReplyId;
          newNotify.reaction = reactionId;
        // New friend request
        case 6:
          newNotify.friendRequest = friendRequestId;
        // Accept friend request
        case 7:
          newNotify.friendRequest = friendRequestId;
      }
      const infoNotify = await newNotify.save().catch((error) => {
        return reject(error.message);
      });

      await Notification.aggregate([
        { $match: { _id: infoNotify._id } },
        ...notifyLookup,
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

const seenNotify = async ({ userId, notifyId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let page = Number(currentPage) || 1;
      let perPage = 5;

      await Notification.findByIdAndUpdate(
        notifyId,
        {
          seen: true,
        },
        { new: true }
      )
        .then((data) => {
          return resolve("Success.");
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const getUserNotify = async ({ userId, currentPage }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let page = Number(currentPage) || 1;
      let perPage = 5;
      await Notification.aggregate([
        {
          $match: { seen: false },
        },
        ...notifyLookup,
        {
          $unwind: "$notifyTo",
        },
        {
          $match: {
            $expr: { $eq: ["$notifyTo._id", mongoose.Types.ObjectId(userId)] },
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: page * perPage - perPage },
        { $limit: perPage },
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

const getUserTotalNotify = async ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const length = await Notification.aggregate([
        {
          $match: { seen: false },
        },
        {
          $unwind: "$notifyTo",
        },
        {
          $match: {
            $expr: { $eq: ["$notifyTo", mongoose.Types.ObjectId(userId)] },
          },
        },
        {
          $count: "totalNotify",
        },
      ])
        .then((data) => {
          return resolve(data[0]);
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

export default {
  getUserNotify,
  notifyTo,
  seenNotify,
  getUserTotalNotify,
};
