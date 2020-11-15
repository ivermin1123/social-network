import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
    {
        name: String,
        description: String,
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "message",
        },
        logo: {
            type: Schema.Types.ObjectId,
            ref: "file",
        },
        files: [
            {
                type: Schema.Types.ObjectId,
                ref: "file",
            },
        ],
        createdAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Conversation", conversationSchema);
