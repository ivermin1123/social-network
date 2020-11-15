const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
    {
        content: String,
        post: {
            type: Schema.Types.ObjectId,
            ref: "post",
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "comment",
        },
        children: [
            {
                type: Schema.Types.ObjectId,
                ref: "comment",
            },
        ],
        level: Number,
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "reaction",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Comment", commentSchema);
