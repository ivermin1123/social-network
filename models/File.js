import { model, Schema } from "mongoose";

const fileSchema = new Schema(
  {
    type: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    url: String,
    name: String,
    size: String,
    path: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("File", fileSchema);
