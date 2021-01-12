import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receivers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: String,
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    status: Number,
    /**
     * 0: Message
     * 1: Image
     * 2: Like
     * 3: Sticker
     */
    type: Number,
    listSeen: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    isRemoved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
