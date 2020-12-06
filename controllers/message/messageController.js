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

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, message, type } = req.body;
    const { userId } = req.userData;

    if (!checkObjectIDs(conversationId)) {
      res.status(400).json({ error: true, message: "param_invalid" });
      return;
    }

    const infoConversation = await Conversation.findById(conversationId).catch(
      (error) => {
        res.status(500).json({ error: true, message: error.message });
        return;
      }
    );

    if (!infoConversation) {
      res.status(400).json({ error: true, message: "conversation_not_found" });
      return;
    }

    const newMessage = new Message({
      sender: userId,
      content: message,
      type,
      conversation: conversationId,
    });

    const infoMessAfterInsert = await newMessage.save().catch((error) => {
      res.status(500).json({ error: true, message: error.message });
      return;
    });

    await Conversation.findByIdAndUpdate(
      infoMessAfterInsert.conversation,
      {
        lastMessage: infoMessAfterInsert._id,
      },
      { new: true }
    );

    await Message.findById(infoMessAfterInsert._id)
      .populate({
        path: "sender",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
        path: "receivers",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
        path: "listSeen",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
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
      .then((message) => {
        res.status(200).json({ error: false, data: message });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.body;
    // console.log({req});
    const { userId } = req.userData;
    await Message.find({ conversation: conversationId })
      .populate({
        path: "sender",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
        path: "receivers",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
        path: "listSeen",
        select: "_id firstName lastName username isOnline avatar",
      })
      .populate({
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
      .sort({ createdAt: 1 })
      .then((messages) => {
        res.status(200).json({ error: false, data: messages });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
