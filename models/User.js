import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    phone: String,
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 40,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    username: {
      type: String,
      minlength: 3,
      maxlength: 30,
      trim: true,
      match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
      required: true,
      unique: true,
    },
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
    password: {
      trim: true,
      minlength: 3,
      type: String,
      required: true,
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    coverImage: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    activityStatus: {
      type: String,
      default: "offline",
    },
    level: {
      type: Number,
      default: 1,
    },
    numLog: Number,
    lastActive: String,
    activated: {
      type: Boolean,
      default: process.env.ENABLE_SEND_EMAIL === "true" ? false : true,
    },
    deactivated: {
      type: Boolean,
    },
    lang: {
      type: String,
      default: "vi",
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: "text", firstName: "text", lastName: "text" });

module.exports = model("User", userSchema);
