import { model, Schema } from "mongoose";

const reactionSchema = new Schema(
    {
        type: Number,
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "post",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "comment",
        },
        message: {
            type: Schema.Types.ObjectId,
            ref: "message_message",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Reaction", reactionSchema);
