import mongoose from "mongoose";

import "../models/FriendRequest";
import "../models/User";

import USER from "./USER";

const FriendRequest = mongoose.model("FriendRequest");
const User = mongoose.model("User");

const sendFriendRequest = async ({ receiver, userId, sender }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listFriReq = await FriendRequest.find({
        receiver,
      }).catch((error) => {
        return reject(error.message);
      });
      const checkSend = (element) => {
        if (
          (element.sender == sender && element.receiver == receiver) ||
          (element.receiver == sender && element.sender == receiver)
        ) {
          return true;
        } else {
          return false;
        }
      };

      const isSend = listFriReq.some(checkSend);
      if (!isSend) {
        const newFriReq = new FriendRequest({
          sender: userId,
          receiver,
        });

        await newFriReq.save().catch((error) => {
          return reject(error.message);
        });
      } else {
        await FriendRequest.deleteOne({
          sender: sender,
          receiver: receiver,
        }).catch((error) => {
          return reject(error.message);
        });
      }

      await USER.getUser({ userIdToGet: userId })
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const acceptFriendRequest = async ({ requestId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoReq = await FriendRequest.findByIdAndDelete(requestId).catch(
        (error) => {
          return reject(error.message);
        }
      );
      await User.findByIdAndUpdate(infoReq.receiver, {
        $push: { friends: infoReq.sender },
      }).catch((error) => {
        return reject(error.message);
      });
      await User.findByIdAndUpdate(infoReq.sender, {
        $push: { friends: infoReq.receiver },
      }).catch((error) => {
        return reject(error.message);
      });

      await USER.getUser({ userIdToGet: userId })
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const unfriend = async ({ friend, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { friends: friend },
      }).catch((error) => {
        return reject(error.message);
      });
      await User.findByIdAndUpdate(friend, {
        $pull: { friends: userId },
      }).catch((error) => {
        return reject(error.message);
      });

      await USER.getUser({ userIdToGet: userId })
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => {
          return reject(error.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

export default {
  sendFriendRequest,
  acceptFriendRequest,
  unfriend,
};
