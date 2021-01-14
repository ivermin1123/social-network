import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Notification schema that has references to User, Like, Follow and Comment schemas
 */
const notificationSchema = Schema(
  {
    notifyBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    notifyTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    /**
     * Post
     * 1: Like Post
     * 2: Comment on Post
     * Comment
     * 3: Like comment
     * 4: Reply comment
     * Friend Request
     * 5: New friend request
     * 6: Accept friend request
     * Message
     */
    type: Number,
    content: String,
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    reaction: {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
    friendRequest: {
      type: Schema.Types.ObjectId,
      ref: "FriendRequest",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    commentReply: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);
