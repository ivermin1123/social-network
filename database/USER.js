import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "../models/User";
import "../models/File";
import "../models/Conversation";

const User = mongoose.model("User");
const File = mongoose.model("File");
// const Conversation = mongoose.model("Conversation");

const updateUserImage = async ({ userId, files }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findById(userId).catch((error) => {
        reject(error.message);
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
          reject(error.message);
        });
      }

      await User.findOneAndUpdate(
        { _id: userId },
        { avatar: listFiles[0] },
        { new: true }
      )
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
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
      } = body;
      User.findOne({
        $or: [{ email: email }, { username: username }],
      }).then((user) => {
        if (!user) {
          bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
              reject(error.message);
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
                  //   notificationHandler.sendNewUser({ req, user });
                  //   if (process.env.ENABLE_SEND_EMAIL === "true") {
                  //     emailHandler.sendVerificationEmail({
                  //       email: user.email,
                  //       _id: user._id,
                  //       username: user.username,
                  //     });
                  //     resolve("Verify your email address");
                  //   } else {
                  //     resolve("Account has been created");
                  //   }
                  resolve("Account has been created");
                })
                .catch((err) => {
                  resolve(err.message);
                });
            }
          });
        } else {
          if (user.username === req.body.username) {
            resolve("Username exists");
          }
          if (user.email === req.body.email) {
            resolve("Email exists");
          }
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

const userLookup = [
  {
    $lookup: {
      from: "users",
      let: { friends: "$friends" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$friends"] } },
        },
        {
          $lookup: {
            from: "files",
            localField: "avatar",
            foreignField: "_id",
            as: "avatar",
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            createdAt: 1,
            username: 1,
            avatar: 1,
          },
        },
      ],
      as: "friends",
    },
  },
  {
    $lookup: {
      from: "conversations",
      let: { conversations: "$conversations" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$conversations"] } },
        },
        {
          $sort: { updatedAt: -1 },
        },
        {
          $limit: 1,
        },
      ],
      as: "lastConversation",
    },
  },
  {
    $lookup: {
      from: "files",
      localField: "avatar",
      foreignField: "_id",
      as: "avatar",
    },
  },
  {
    $lookup: {
      from: "files",
      localField: "coverImage",
      foreignField: "_id",
      as: "coverImage",
    },
  },
  {
    $lookup: {
      from: "friendrequests",
      let: { idUser: "$_id" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$sender", "$$idUser"] } },
        },
        {
          $lookup: {
            from: "users",
            let: { receiver: "$receiver" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$receiver"] } },
              },
              {
                $lookup: {
                  from: "files",
                  localField: "avatar",
                  foreignField: "_id",
                  as: "avatar",
                },
              },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  createdAt: 1,
                  username: 1,
                  avatar: 1,
                },
              },
            ],
            as: "receiver",
          },
        },
      ],
      as: "sendFriReq",
    },
  },
  {
    $lookup: {
      from: "friendrequests",
      let: { idUser: "$_id" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$receiver", "$$idUser"] } },
        },
        {
          $lookup: {
            from: "users",
            let: { sender: "$sender" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$sender"] } },
              },
              {
                $lookup: {
                  from: "files",
                  localField: "avatar",
                  foreignField: "_id",
                  as: "avatar",
                },
              },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  createdAt: 1,
                  username: 1,
                  avatar: 1,
                },
              },
            ],
            as: "sender",
          },
        },
      ],
      as: "receiveReqFri",
    },
  },
];

const getUser = async ({ userIdToGet }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = [
        {
          $match: {
            _id: mongoose.Types.ObjectId(userIdToGet),
          },
        },
        {
          $addFields: {
            conversations: {
              $cond: {
                if: {
                  $ne: [{ $type: "$conversations" }, "array"],
                },
                then: [],
                else: "$conversations",
              },
            },
          },
        },
        ...userLookup,
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            createdAt: 1,
            username: 1,
            level: 1,
            gender: 1,
            conversations: 1,
            lastConversation: 1,
            sendFriReq: 1,
            receiveReqFri: 1,
            birthday: 1,
            phone: 1,
            email: 1,
            avatar: 1,
            coverImage: 1,
            friends: 1,
          },
        },
      ];
      await User.aggregate(query)
        .then((data) => {
          resolve(data[0]);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

const changePassword = async ({ password, newPassword, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userId);

      const result = await bcrypt.compare(password, infoUser.password);
      if (!result) {
        reject("password_incorrect");
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
      reject(error.message);
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
              reject("Incorrect credentials.");
            });
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

const getUsers = async ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const infoUser = await User.findById(userId).catch((error) => {
        return reject({ error: true, message: error.message });
      });
      if (infoUser.level !== 100) {
        return reject({ error: true, message: "Access denied." });
      } else {
        await User.find()
          .populate("posts")
          .populate("friends")
          .sort({ createdAt: -1 })
          .limit(100)
          .then((data) => {
            return resolve(data);
          });
      }
    } catch (error) {
      return reject(error.message);
    }
  });
};

const updateStatus = async ({ userId, isOffline }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectData = isOffline
        ? {
            activityStatus: false,
            lastActive: new Date(),
          }
        : {
            activityStatus: true,
          };
      await User.findByIdAndUpdate(userId, objectData, { new: true });
      return resolve();
    } catch (error) {
      return reject(error.message);
    }
  });
};

const searchUser = async ({ key }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const arraySearch = key.map((el) => new RegExp(el, "i"));
      await User.find({
        $or: [
          { username: { $in: arraySearch } },
          { firstName: { $in: arraySearch } },
          { lastName: { $in: arraySearch } },
        ],
      })
        .populate("avatar")
        .limit(5)
        .select({
          firstName: 1,
          lastName: 1,
          avatar: 1,
          _id: 1,
        })
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => {
          return reject(err.message);
        });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const updateUserInformation = async ({ userId, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { firstName, lastName } = body;
      await User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
        },
        { new: true }
      )
        .then((data) => {
          return resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return reject(error.message);
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
  updateStatus,
  searchUser,
  updateUserInformation,
};
