import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
    {
        name: String,
        description: String,
        members: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
        logo: {
            type: Schema.Types.ObjectId,
            ref: "File",
        },
        files: {
            type: Schema.Types.ObjectId,
            ref: "File",
        },
        createdAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Conversation", conversationSchema);
