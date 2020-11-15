import { model, Schema } from "mongoose";

const fileSchema = new Schema(
    {
        type: String,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        url: String,
        name: String,
        size: String,
        createdAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = model("File", fileSchema);
