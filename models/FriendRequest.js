import { model, Schema } from "mongoose";

const friendRequestSchema = new Schema(
  {
    type: String,
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("FriendRequest", friendRequestSchema);
