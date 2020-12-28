import mongoose from "mongoose";

import "../models/FriendRequest";

const FriendRequest = mongoose.model("FriendRequest");

const sendFriendRequest = async ({ sendTo, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error.message);
    }
  });
};

const acceptFriendRequest = async ({ sendTo, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error.message);
    }
  });
};

const deleteFriendRequest = async ({ sendTo, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error.message);
    }
  });
};

export default {
  sendFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
};
