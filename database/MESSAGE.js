import mongoose from "mongoose";
import "../models/Message";
import "../models/Conversation";
import { checkObjectIDs } from "../utils/db-check";

const Message = mongoose.model("Message");
const Conversation = mongoose.model("Conversation");

const messagesLookup = [
  {
    $lookup: {
      from: "users",
      let: { sender: "$sender" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$sender"] } },
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
      as: "sender",
    },
  },
  {
    $lookup: {
      from: "users",
      let: { receivers: "$receivers" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$receivers"] } },
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
      as: "receivers",
    },
  },
  {
    $lookup: {
      from: "users",
      let: { listSeen: "$listSeen" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$listSeen"] } },
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
      as: "listSeen",
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
      from: "users",
      let: { listSeen: "$listSeen" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$listSeen"] } },
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
      as: "listSeen",
    },
  },
  {
    $lookup: {
      from: "messages",
      let: { lastMessage: "$lastMessage" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$lastMessage"] } },
        },
        {
          $lookup: {
            from: "users",
            let: { sender: "$sender" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$sender"] } },
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
                  isOnline: 1,
                },
              },
            ],
            as: "author",
          },
        },
      ],
      as: "author",
    },
  },
  {
    $lookup: {
      from: "files",
      localField: "files",
      foreignField: "_id",
      as: "files",
    },
  },
  {
    $lookup: {
      from: "files",
      localField: "logo",
      foreignField: "_id",
      as: "logo",
    },
  },
];

const sendMessage = async ({ conversationId, message, type, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(conversationId)) {
        return reject({ error: true, message: "param_invalid" });
      }

      const newMessage = new Message({
        sender: userId,
        content: message,
        type,
        conversation: conversationId,
      });

      const infoMessAfterInsert = await newMessage.save().catch((error) => {
        return reject({ error: true, message: error.message });
      });

      await Conversation.findByIdAndUpdate(
        mongoose.Types.ObjectId(infoMessAfterInsert.conversation),
        {
          lastMessage: infoMessAfterInsert._id,
        },
        { new: true }
      );

      await Message.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(infoMessAfterInsert._id),
          },
        },
        ...messagesLookup,
      ])
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => {
          return reject({ error: true, message: error.message });
        });
    } catch (error) {
      return reject({ error: true, message: error.message });
    }
  });
};

const getMessages = async ({ conversationId, currentPage }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = Number(currentPage) || 1;
      const perPage = 20;

      await Message.aggregate([
        {
          $match: {
            conversation: mongoose.Types.ObjectId(conversationId),
          },
        },
        ...messagesLookup,
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: page * perPage - perPage,
        },
        {
          $limit: perPage,
        },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject({ error: true, message: err.message }));
    } catch (error) {
      return reject({ error: true, message: error.message });
    }
  });
};

export default {
  getMessages,
  sendMessage,
};
