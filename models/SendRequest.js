import { model, Schema } from "mongoose";

const sendRequestSchema = new Schema(
    {
        type: String,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        accepted: {
            type: Boolean,
            default: false,
        },
        rejected: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("SendRequest", sendRequestSchema);
