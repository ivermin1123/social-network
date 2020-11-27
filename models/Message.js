import { model, Schema } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        receivers: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: String,
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
        },
        status: Number,
        type: Number,
        listSeen: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        reactions: {
            type: Schema.Types.ObjectId,
            ref: "Reaction",
        },
        isRemoved: Boolean,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Message", messageSchema);
