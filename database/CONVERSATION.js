import mongoose, { MongooseDocument } from "mongoose";
import { checkObjectIDs } from "../utils/db-check";
import _ from "lodash";

import "../models/Conversation";
import "../models/User";
import "../models/File";
import "../models/Message";

const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const File = mongoose.model("File");

const conversationsLookup = [
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
            isOnline: 1,
          },
        },
      ],
      as: "author",
    },
  },
  {
    $lookup: {
      from: "users",
      let: { members: "$members" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$members"] } },
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
      as: "members",
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
      as: "lastMessage",
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

const createConversation = async ({ body, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { members, message, type } = body;

      if (!checkObjectIDs(...members)) {
        reject("param_invalid");
      }

      // Prepare info to insert
      const promises = [];
      const arrName = [];
      members.sort().forEach((member) => {
        promises.push(
          User.findById(member).then((mem) => {
            arrName.push(`${mem.firstName} ${mem.lastName}`);
          })
        );
      });
      // Call promise all to insert
      await Promise.all(promises).catch((error) => {
        reject({ message: error.message });
      });

      const nameConversation = arrName.sort().join(",");
      let isGroup;
      if (members.length > 2) {
        isGroup = true;
      } else {
        isGroup = false;
        const infoConversationCheck = await Conversation.findOne({
          name: nameConversation,
        });
        if (infoConversationCheck) {
          const arrNameCheck = infoConversationCheck.name.split(",");
          if (_.isEqual(arrName.sort(), arrNameCheck.sort())) {
            return reject({ message: "conversation is exist" });
          }
        }
      }
      const newConversation = new Conversation({
        isGroup,
        name: nameConversation,
        members,
        author: userId,
      });

      // Insert
      const infoConversationAfterInsert = await newConversation
        .save()
        .catch((error) => {
          reject({ error: true, message: error.message });
        });

      const promisesUpdateUser = [];
      members.forEach((member) => {
        promisesUpdateUser.push(
          User.findByIdAndUpdate(
            member,
            {
              $push: { conversations: infoConversationAfterInsert._id },
            },
            { new: true }
          )
        );
      });

      await Promise.all(promisesUpdateUser).catch((error) => {
        reject({ error: true, message: error.message });
      });

      const newMessage = new Message({
        sender: userId,
        receivers: members,
        content: message,
        conversation: infoConversationAfterInsert._id,
        type,
      });

      const infoMessAfterInsert = await newMessage.save().catch((error) => {
        reject({ error: true, message: error.message });
      });

      await Conversation.findByIdAndUpdate(
        infoConversationAfterInsert._id,
        { lastMessage: infoMessAfterInsert._id },
        { new: true }
      )
        .then(() => {
          resolve(infoConversationAfterInsert);
        })
        .catch((error) => {
          reject({ error: true, message: error.message });
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

const getConversation = async ({ conversationId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(conversationId))
        reject({ error: true, message: "param_invalid" });

      const infoUser = await User.findById(userId).catch((error) => {
        reject({ error: true, message: error.message });
      });

      // Check permission
      if (
        infoUser.conversations &&
        !infoUser.conversations.includes(conversationId)
      ) {
        reject({ error: true, message: "Access denied!" });
      }

      await Conversation.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(conversationId) },
        },
        ...conversationsLookup,
        {
          $sort: { updatedAt: -1 },
        },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject({ error: true, message: err.message }));
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

const getConversationId = async ({ user, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userId).catch((err) =>
        reject({ error: true, message: err.message })
      );
      const infoConversation = await Conversation.aggregate([
        {
          $match: { $expr: { $in: ["$_id", infoUser.conversations] } },
        },
        {
          $match: { isGroup: false },
        },
        {
          $unwind: "$members",
        },
        {
          $match: { members: mongoose.Types.ObjectId(user) },
        },
      ]).catch((err) => reject({ error: true, message: err.message }));

      if (infoConversation.length) return resolve(infoConversation[0]);

      const members = [user, userId];
      const checkUser = await User.find({
        $or: [{ _id: user }, { _id: userId }],
      }).countDocuments();
      if (checkUser !== 2) {
        console.log(checkUser);
        return reject("params_invalid");
      }
      const newConversation = new Conversation({
        isGroup: false,
        members,
        author: userId,
      });

      const infoConversationAfterInsert = await newConversation
        .save()
        .catch((error) => {
          return reject({ error: true, message: error.message });
        });

      const promisesUpdateUser = [];
      members.forEach((member) => {
        promisesUpdateUser.push(
          User.findByIdAndUpdate(
            member,
            {
              $push: { conversations: infoConversationAfterInsert._id },
            },
            { new: true }
          )
        );
      });

      await Promise.all(promisesUpdateUser).catch((error) => {
        return reject({ error: true, message: error.message });
      });

      return resolve(infoConversationAfterInsert);
    } catch (error) {
      return reject({ message: error.message });
    }
  });
};

const getConversations = async ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById({ _id: userId });

      await Conversation.aggregate([
        {
          $match: { _id: { $in: infoUser.conversations } },
        },
        ...conversationsLookup,
        { $limit: 10 },
        { $sort: { updatedAt: -1 } },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject({ error: true, message: err.message }));
    } catch (error) {
      reject(error.message);
    }
  });
};
export default {
  createConversation,
  getConversation,
  getConversations,
  getConversationId,
};
