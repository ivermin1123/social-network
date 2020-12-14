import mongoose from "mongoose";
import { checkObjectIDs } from "../../utils/db-check";
import _ from "lodash";

import "../../models/Conversation";
import "../../models/User";
import "../../models/File";
import "../../models/Message";

const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const File = mongoose.model("File");

export const createConversation = async (req, res) => {
  try {
    const { members, message, type } = req.body;
    const { userId } = req.userData;

    if (!checkObjectIDs(...members)) {
      res.status(500).json({ error: true, message: "param_invalid" });
      return;
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
      res.status(500).json({ error: true, message: error.message });
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
          res
            .status(500)
            .json({ error: true, message: "conversation is exist" });
          return;
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
        res.status(500).json({ error: true, message: error.message });
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
      res.status(500).json({ error: true, message: error.message });
    });

    const newMessage = new Message({
      sender: userId,
      receivers: members,
      content: message,
      conversation: infoConversationAfterInsert._id,
      type,
    });

    const infoMessAfterInsert = await newMessage.save().catch((error) => {
      res.status(500).json({ error: true, message: error.message });
    });

    await Conversation.findByIdAndUpdate(
      infoConversationAfterInsert._id,
      { lastMessage: infoMessAfterInsert._id },
      { new: true }
    )
      .then(() => {
        res
          .status(200)
          .json({ error: false, data: infoConversationAfterInsert });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    console.log("1", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const { userId } = req.userData;

    const infoUser = await User.findById(userId).catch((error) => {
      res.status(500).json({ error: true, message: error.message });
    });

    // Check permission
    if (
      infoUser.conversations &&
      !infoUser.conversations.includes(conversationId)
    ) {
      res.status(400).json({ error: true, message: "Access denied!" });
    }

    if (!checkObjectIDs(conversationId))
      res.status(500).json({ error: true, message: "param_invalid" });

    await Conversation.findById(conversationId)
      .populate({
        path: "author",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
        path: "members",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
        path: "lastMessage",
        populate: [
          {
            path: "sender",
            select: "_id firstName lastName username isOnline avatar",
          },
          {
            path: "receivers",
            select: "_id firstName lastName username isOnline avatar",
          },
          {
            path: "listSeen",
            select: "_id firstName lastName username isOnline avatar",
          },
          {
            path: "reactions",
            populate: [
              {
                path: "author",
                select: "_id firstName lastName username isOnline avatar",
              },
              {
                path: "message",
              },
            ],
          },
        ],
      })
      .populate({
        path: "logo",
      })
      .populate({
        path: "files",
      })
      .sort({ updatedAt: -1 })
      .then((conversations) => {
        res.status(200).json({ error: false, data: conversations });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { userId } = req.userData;
    const infoUser = await User.findOne({ _id: userId });
    await Conversation.find({ _id: { $in: infoUser.conversations } })
      .populate({
        path: "author",
        select: "_id firstName lastName username isOnline avatar",
        populate: [{ path: "avatar" }],
      })
      .populate({
        path: "members",
        select: "_id firstName lastName username isOnline avatar",
        populate: [{ path: "avatar" }],
      })
      .populate({
        path: "lastMessage",
        populate: [
          {
            path: "sender",
            select: "_id firstName lastName username isOnline avatar",
          },
          {
            path: "receivers",
            select: "_id firstName lastName username isOnline avatar",
          },
          {
            path: "listSeen",
            select: "_id firstName lastName username isOnline avatar",
          },
          {
            path: "reactions",
            populate: [
              {
                path: "author",
                select: "_id firstName lastName username isOnline avatar",
              },
              {
                path: "message",
              },
            ],
          },
        ],
      })
      .populate({
        path: "logo",
      })
      .populate({
        path: "files",
      })
      .limit(20)
      .sort({ updatedAt: -1 })
      .then((conversations) => {
        res.status(200).json({ error: false, data: conversations });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
