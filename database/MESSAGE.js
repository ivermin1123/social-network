import mongoose from "mongoose";
import "../models/Message";
import "../models/Conversation";
import { checkObjectIDs } from "../utils/db-check";

const ObjectId = mongoose.Types.ObjectId;
const Message = mongoose.model("Message");
const Conversation = mongoose.model("Conversation");

const sendMessage = async ({ conversationId, message, type, userId }) => {
  return new Promise(async (resolve) => {
    try {
      if (!checkObjectIDs(conversationId)) {
        resolve({ error: true, message: "param_invalid" });
      }

      const newMessage = new Message({
        sender: userId,
        content: message,
        type,
        conversation: conversationId,
      });

      const infoMessAfterInsert = await newMessage.save().catch((error) => {
        resolve({ error: true, message: error.message });
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
        .then((infoMessage) => {
          resolve({ error: false, data: infoMessage });
        })
        .catch((error) => {
          resolve({ error: true, message: error.message });
        });
    } catch (error) {
      resolve({ error: true, message: error.message });
    }
  });
};

const getMessages = async ({ conversationId, currentPage }) => {
  return new Promise(async (resolve) => {
    try {
      const page = Number(currentPage) || 1;
      const perPage = 20;
      const infoConversation = await Conversation.findById(
        conversationId
      ).select("_id");
      await Message.find({
        conversation: infoConversation._id,
      })
        .populate("conversation")
        .populate({
          path: "sender",
          select: "_id firstName lastName username isOnline avatar",
          populate: [{ path: "avatar" }],
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
        .skip(page * perPage - perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })
        .then((messages) => {
          resolve({ error: false, data: messages });
        })
        .catch((err) => resolve({ error: true, message: err.message }));
    } catch (error) {
      return resolve({ error: true, message: error.message });
    }
  });
};

const MESSAGE = {
  getMessages,
  sendMessage,
};

export default MESSAGE;
