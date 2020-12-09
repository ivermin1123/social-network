import mongoose from "mongoose";
import "../models/Message";

const Message = mongoose.model("Message");

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
};

export default MESSAGE;
