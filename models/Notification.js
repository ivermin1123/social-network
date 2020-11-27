import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Notification schema that has references to User, Like, Follow and Comment schemas
 */
const notificationSchema = Schema(
    {
        notifyBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        notifyTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        post: Schema.Types.ObjectId,
        reaction: {
            type: Schema.Types.ObjectId,
            ref: "Reaction",
        },
        friendRequest: {
            type: Schema.Types.ObjectId,
            ref: "SendRequest",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Notification", notificationSchema);
