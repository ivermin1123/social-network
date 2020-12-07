import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import "../../models/User";

import {
  notificationHandler,
  emailHandler,
  messageHandler,
} from "../../utils/main-utils";

const User = mongoose.model("User");
// const Post = mongoose.model("Post");
// const Notification = mongoose.model("Notification");
// const ChatRoom = mongoose.model("ChatRoom");
// const Message = mongoose.model("Message");

export async function updateUserImage(req, res) {
  try {
    const { userId } = req.data;
    const { files } = req.body;

    const infoUser = await User.findById(userId).catch((error) => {
      res.status(500).json({ error: true, message: error.message });
    });

    if (files) {
      if (!Array.isArray(files)) {
        files = Array.from(files);
      }
      const promises = [];
      let listFiles = [];
      files.forEach((file) => {
        const { type, url, name, size, path } = file;
        const newFile = new File({
          type,
          sender: userId,
          url,
          name,
          size,
          path,
        });
        promises.push(newFile.save().then((res) => listFiles.push(res._id)));
      });

      await Promise.all(promises).catch((error) => {
        res.status(500).json({ error: true, message: error.message });
        return;
      });
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { avatar: listFiles[0] },
      { new: true }
    )
      .then((user) => {
        res.status(200).json({ error: false, data: user });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
  User.findOneAndUpdate(req.userData.userId)
    .select("profilePicture")
    .then((data) => {
      if (data.profilePicture !== "person.png") {
        deleteProfilePicture({ photo: data.profilePicture });
      }

      User.findOneAndUpdate(
        { _id: req.userData.userId },
        { profilePicture: req.body.photo },
        { new: true }
      )
        .select("profilePicture")
        .then((user) => {
          return res.status(200).json({ user });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err.message });
    });
}

export function addUser(req, res) {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            birthday: req.body.birthday,
            gender: req.body.gender,
            password: hash,
          });

          user
            .save()
            .then((user) => {
              notificationHandler.sendNewUser({ req, user });
              if (process.env.ENABLE_SEND_EMAIL === "true") {
                emailHandler.sendVerificationEmail({
                  email: user.email,
                  _id: user._id,
                  username: user.username,
                });
                return res.status(201).json({
                  message: "Verify your email address",
                });
              } else {
                return res.status(201).json({
                  message: "Account created",
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({ message: err.message });
            });
        }
      });
    } else {
      if (user.username === req.body.username) {
        return res.status(409).json({
          message: "Username exists",
        });
      }
      if (user.email === req.body.email) {
        return res.status(409).json({
          message: "Email exists",
        });
      }
    }
  });
}

export function loginUser(req, res, next) {
  User.aggregate([
    {
      $match: {
        $or: [{ email: req.body.email }, { username: req.body.email }],
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        password: 1,
      },
    },
  ])
    .then((users) => {
      if (users.length < 1) {
        return res.status(400).json({
          message: "Incorrect credentials.",
        });
      } else {
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          if (err) {
            return res.status(400).json({
              message: "Incorrect credentials.",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: users[0].email,
                userId: users[0]._id,
                username: users[0].username,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "24h",
              }
            );

            const user = {
              _id: users[0]._id,
              username: users[0].username,
              token: "Bearer " + token,
            };
            req.body.user = user;
            next();
            return;
          }
          return res.status(400).json({ message: "Incorrect credentials." });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
}

export const sendUserData = (req, res) => {
  return res.status(200).json({ user: req.body.user });
};

export const resetPassword = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      User.findOneAndUpdate({ email: req.userData.email }, { password: hash })
        .then(() => {
          return res.status(200).json({ message: "password reseted" });
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(500).json({ message: err.message });
        });
    }
  });
};

export const getUsers = async (req, res) => {
  try {
    const { email, userId, username } = req.userData;
    const { time } = req.body;
    const infoUser = await User.find({
      createdAt: { $lte: new Date(time) },
    })
      .populate("posts")
      .populate("friends")
      .sort({ createdAt: -1 })
      .limit(100);

    if (!infoUser) res.status(500).json({ error: true, message: "cannot_get" });
    res.status(200).json({ error: false, data: infoUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { userId: userIdGet } = req.body;
    const userIdToGet = userIdGet ? userIdGet : userId;
    const infoUser = await User.findById(userIdToGet)
      .populate("posts")
      .populate("friends");

    if (!infoUser) res.status(500).json({ error: true, message: "cannot_get" });
    if (infoUser.deactivated)
      res.status(500).json({ error: true, message: "user_deactivated" });
    res.status(200).json({ error: false, data: infoUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
