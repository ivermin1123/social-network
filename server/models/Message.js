import { model, Schema } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        receivers: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        content: String,
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "conversation",
        },
        status: Number,
        type: Number,
        listSeen: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "reaction",
            },
        ],
        isRemoved: Boolean,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Message", messageSchema);
