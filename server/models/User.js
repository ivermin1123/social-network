import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: String,
        password: String,
        email: String,
        phone: String,
        lastName: String,
        firstName: String,
        birthday: Date,
        gender: Number,
        avatar: {
            type: Schema.Types.ObjectId,
            ref: "file",
        },
        image: String,
        status: Number,
        level: Number,
        numLog: Number,
        lastLogin: Date,
        lang: String,
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        friendsRequestSend: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        friendsRequestReceive: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
