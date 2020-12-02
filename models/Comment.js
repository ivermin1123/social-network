const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    content: String,
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
