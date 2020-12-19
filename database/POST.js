import mongoose from "mongoose";
import { checkObjectIDs } from "../utils/db-check";

import "../models/Post";
import "../models/File";
// import { reject, resolve } from "bluebird";

const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

const Post = mongoose.model("Post");
const File = mongoose.model("File");

const postsLookup = [
  {
    $lookup: {
      from: "users",
      let: { author: "$author" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$author"] } },
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
      as: "author",
    },
  },
  {
    $lookup: {
      from: "reactions",
      let: { reactions: "$reactions" },
      pipeline: [
        {
          $match: { $expr: { $in: ["$_id", "$$reactions"] } },
        },
        {
          $lookup: {
            from: "users",
            let: { author: "$author" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$_id", "$$author"] } },
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
            as: "author",
          },
        },
      ],
      as: "reactions",
    },
  },
  {
    $lookup: {
      from: "comments",
      let: { comments: "$comments" },
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$comments"] } },
        },
        {
          $lookup: {
            from: "reactions",
            let: { reactions: "$reactions" },
            pipeline: [
              {
                $match: { $expr: { $in: ["$_id", "$$reactions"] } },
              },
              {
                $lookup: {
                  from: "users",
                  let: { author: "$author" },
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ["$_id", "$$author"] } },
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
                  as: "author",
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { author: "$author" },
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ["$_id", "$$author"] } },
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
                  as: "author",
                },
              },
            ],
            as: "reactions",
          },
        },
      ],
      as: "comments",
    },
  },
  {
    $lookup: {
      from: "files",
      localField: "files",
      foreignField: "_id",
      as: "files",
    },
  },
];

const createPost = async ({ body, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { files, description, coordinates, locationName, tags } = body;

      const hashtags = linkify // find hashtags
        .find(description)
        .filter((link) => {
          if (link.type === "hashtag") {
            return link.value.substring(1);
          }
        })
        .map((hashtag) => hashtag.value.substring(1));

      const mentions = linkify // find mentions
        .find(description)
        .filter((link) => {
          if (link.type === "mention") {
            return link.value.substring(1);
          }
        })
        .map((hashtag) => hashtag.value.substring(1));

      //   const tags = JSON.parse(req.body.tags).map((tag) => tag.value);

      //   const uniqueUsernames = [...new Set([...mentions, ...tags])];

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

      let newPost;
      if (coordinates) {
        const coordinates = coordinates.split(",").map((x) => parseFloat(x));
        newPost = new Post({
          author: userId,
          description: description,
          hashtags: [...new Set(hashtags)], // remove duplicates
          location: {
            type: "Point",
            coordinates: coordinates,
            address: locationName,
          },
          files: listFiles,
          //: JSON.parse(tags),
        });
      } else {
        newPost = new Post({
          author: userId,
          description: description,
          hashtags: [...new Set(hashtags)], // remove duplicates
          files: listFiles,
          // tags: JSON.parse(tags),
        });
      }

      await newPost
        .save()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

const getPostById = async ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!checkObjectIDs(postId))
        reject({ error: true, message: "param_invalid" });
      await Post.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(postId) },
        },
        ...postsLookup,
        {
          $sort: { createdAt: -1 },
        },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

const getPosts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = [
        {
          $facet: {
            posts: [
              { $sort: { createdAt: -1 } },
              { $limit: 10 },
              ...postsLookup,
            ],
          },
        },
      ];

      await Post.aggregate(query)
        .then((data) => {
          resolve(data[0].posts);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

const getUserPosts = async ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = [
        {
          $facet: {
            posts: [
              {
                $match: {
                  author: mongoose.Types.ObjectId(userId),
                },
              },
              { $sort: { createdAt: -1 } },
              { $limit: 10 },
              ...postsLookup,
            ],
          },
        },
      ];

      await Post.aggregate(query)
        .then((data) => {
          resolve(data[0].posts);
        })
        .catch((error) => {
          reject(error.message);
        });
    } catch (error) {
      reject(error.message);
    }
  });
};

export default {
  createPost,
  getPostById,
  getPosts,
  getUserPosts,
};
