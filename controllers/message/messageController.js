import mongoose from "mongoose";
import { checkObjectIDs } from "../../utils/db-check";
import _ from "lodash";

import "../../models/Conversation";
import "../../models/User";
import "../../models/File";
import "../../models/Message";
import MESSAGE from "../../database/MESSAGE";

const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");
const User = mongoose.model("User");

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    // console.log({req});
    const { userId } = req.userData;

    const infoMessages = await MESSAGE.getMessages({ conversationId }).catch(
      (error) => {
        res.status(500).json(infoMessages);
      }
    );
    res.status(200).json({ error: false, data: infoMessages });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
