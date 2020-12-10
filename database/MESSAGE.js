import mongoose from "mongoose";
import "../models/Message";
import "../models/Conversation";
import { checkObjectIDs } from "../utils/db-check";

const Message = mongoose.model("Message");
const Conversation = mongoose.model("Conversation");

const sendMessage = async ({ conversationId, message, type, userId }) => {
  return new Promise(async (resolve) => {
    try {
      if (!checkObjectIDs(conversationId)) {
        resolve({ error: true, message: "param_invalid" });
      }

      const infoConversation = await Conversation.findById(
        conversationId
      ).catch((error) => {
        resolve({ error: true, message: error.message });
      });

      if (!infoConversation) {
        res
          .status(400)
          .json({ error: true, message: "conversation_not_found" });
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
        .then((message) => {
          resolve({ error: false, data: message });
        })
        .catch((error) => {
          resolve({ error: true, message: error.message });
        });
    } catch (error) {
      resolve({ error: true, message: error.message });
    }
  });
};

const getMessage = async ({ conversationId }) => {
  return new Promise(async (resolve) => {
    try {
      await Message.findById(conversationId)
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
          console.log(message);
          return resolve({ error: false, data: message });
        })
        .catch((err) => {
          return resolve({ error: true, message: err.message });
        });
    } catch (error) {
      return resolve({ error: true, message: error.message });
    }
  });
};

const MESSAGE = {
  getMessage,
  sendMessage,
};

export default MESSAGE;
