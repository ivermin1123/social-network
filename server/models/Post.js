const { model, Schema } = require("mongoose");

const postSchema = new Schema(
    {
        type: Number,
        title: String,
        content: String,
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "comment",
            },
        ],
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "reaction",
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", postSchema);
