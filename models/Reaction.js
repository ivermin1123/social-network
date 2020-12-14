import { model, Schema } from "mongoose";

const reactionSchema = new Schema(
  {
    /**
     * 1: like
     * 2: love
     * 3: haha
     * 4: wow
     * 5: sad
     * 6: angry
     */
    type: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Reaction", reactionSchema);
