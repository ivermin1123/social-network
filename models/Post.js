const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    description: String,
    filter: String,
    type: String,
    location: String,
    isUpdated: {
      type: Boolean,
      default: false,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hashtags: {
      type: Array,
      default: [],
    },
    location: {
      type: {
        type: String,
      },
      coordinates: { type: [], default: undefined },
      address: {
        type: String,
      },
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
