const { model, Schema } = require("mongoose");

const postSchema = new Schema(
    {
        description: String,
        filter: String,
        type: String,
        location: String,
        image: String,
        imagePublicId: String,
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        reactions: {
            type: Schema.Types.ObjectId,
            ref: "Reaction",
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", postSchema);
