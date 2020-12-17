import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "../models/User";
import "../models/File";
import "../models/Conversation";

const User = mongoose.model("User");
const File = mongoose.model("File");
const Conversation = mongoose.model("Conversation");

const updateUserImage = async ({ userId, files }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userId).catch((error) => {
        reject({ error: true, message: error.message });
      });

      let listFiles = [];
      if (files) {
        if (!Array.isArray(files)) {
          files = Array.from(files);
        }
        const promises = [];
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
          reject({ error: true, message: error.message });
        });
      }

      await User.findOneAndUpdate(
        { _id: userId },
        { avatar: listFiles[0] },
        { new: true }
      )
        .then((user) => {
          resolve({ error: false, data: user });
        })
        .catch((error) => {
          reject({ error: true, message: error.message });
        });
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

const insert = async ({ body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        password,
        email,
        firstName,
        lastName,
        username,
        birthday,
        gender,
      } = infoUser;
      User.findOne({
        $or: [{ email: email }, { username: username }],
      }).then((user) => {
        if (!user) {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              resolve({ error: err });
            } else {
              const user = new User({
                email,
                firstName,
                lastName,
                username,
                birthday,
                gender,
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
                    resolve({
                      message: "Verify your email address",
                    });
                  } else {
                    resolve({
                      message: "Account created",
                    });
                  }
                })
                .catch((err) => {
                  resolve({ message: err.message });
                });
            }
          });
        } else {
          if (user.username === req.body.username) {
            resolve({
              message: "Username exists",
            });
          }
          if (user.email === req.body.email) {
            resolve({
              message: "Email exists",
            });
          }
        }
      });
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

const getUser = async ({ userIdToGet }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userIdToGet)
        .populate("avatar")
        .populate("posts")
        .populate({
          path: "friends",
          select: "_id firstName lastName username gender avatar",
          populate: [{ path: "avatar" }],
        })
        .select(
          "_id firstName lastName createdAt username gender birthday phone email avatar coverImage conversations"
        );

      if (!infoUser) reject({ error: true, message: "cannot_get" });
      if (infoUser.deactivated)
        reject({ error: true, message: "user_deactivated" });
      const lastConversation = await Conversation.find({
        _id: { $in: infoUser.conversations },
      })
        .sort({ updatedAt: -1 })
        .limit(1);
      resolve({ error: false, data: { infoUser, lastConversation } });
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

const changePassword = async ({ password, newPassword, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userId);

      const result = await bcrypt.compare(password, infoUser.password);
      if (!result) {
        reject({ error: true, message: "password_incorrect" });
      } else {
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            resolve({ message: err });
          } else {
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => {
                resolve({ message: "password_update" });
              })
              .catch((err) => {
                resolve({ message: err.message });
              });
          }
        });
      }
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

const login = async ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      User.aggregate([
        {
          $match: {
            $or: [{ email: email }, { username: email }],
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            gender: 1,
            coverImage: 1,
            lang: 1,
            avatar: 1,
            phone: 1,
            birthday: 1,
            password: 1,
          },
        },
      ])
        .then((users) => {
          if (users.length < 1) {
            reject({
              message: "Incorrect credentials.",
            });
          } else {
            bcrypt.compare(password, users[0].password, (err, result) => {
              if (err) {
                reject({
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

                const {
                  _id,
                  username,
                  firstName,
                  lastName,
                  email,
                  gender,
                  coverImage,
                  lang,
                  avatar,
                  phone,
                  birthday,
                } = users[0];
                const user = {
                  _id,
                  username,
                  firstName,
                  lastName,
                  email,
                  gender,
                  coverImage,
                  lang,
                  avatar,
                  phone,
                  birthday,
                  token: "Bearer " + token,
                };
                resolve(user);
              }
              reject({ message: "Incorrect credentials." });
            });
          }
        })
        .catch((err) => {
          reject({ message: err });
        });
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

const getUsers = async ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userId).catch((error) => {
        reject({ error: true, message: error.message });
      });
      if (infoUser.level !== 100) {
        reject({ error: true, message: "Access denied." });
      } else {
        await User.find()
          .populate("posts")
          .populate("friends")
          .sort({ createdAt: -1 })
          .limit(100)
          .then((data) => {
            resolve({ error: false, data });
          });
      }
    } catch (error) {
      reject({ error: true, message: error.message });
    }
  });
};

export default {
  insert,
  updateUserImage,
  getUser,
  getUsers,
  changePassword,
  login,
};
