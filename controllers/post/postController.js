import mongoose from "mongoose";
import { checkObjectIDs } from "../../utils/db-check";

import "../../models/Post";
import "../../models/File";

const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

const Post = mongoose.model("Post");
const File = mongoose.model("File");

export const createPost = async (req, res) => {
  try {
    const { files, description, coordinates, locationName, tags } = req.body;
    const { userId } = req.userData;
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
        res.status(500).json({ error: true, message: error.message });
      });
    }

    let newPost;
    if (coordinates) {
      const coordinates = coordinates.split(",").map((x) => parseFloat(x));
      newPost = new Post({
        author: req.userData.userId,
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

    const infoAfterInsert = await newPost.save().catch((error) => {
      console.log(error);
      res.status(500).json({ error: true, message: error.message });
    });

    await Post.findById(infoAfterInsert._id)
      .populate({
        path: "author",
        select: "_id firstName lastName createdAt username avatar",
        populate: [{ path: "avatar" }],
      })
      .populate({
        path: "reactions",
        populate: [
          {
            path: "author",
            populate: [{ path: "avatar" }],
            select: "_id firstName lastName createdAt username avatar",
          },
        ],
      })
      .populate({
        path: "comments",
        populate: [
          { path: "author" },
          {
            path: "reactions",
            populate: [{ path: "author" }, { path: "comment" }],
          },
        ],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "files",
      })
      .then((post) => {
        res.status(200).json({ error: false, data: post });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!checkObjectIDs(postId))
      res.status(500).json({ error: true, message: "param_invalid" });
    await Post.findById(postId)
      .populate({
        path: "author",
        select: "_id firstName lastName createdAt username avatar",
        populate: [{ path: "avatar" }],
      })
      .populate({
        path: "reactions",
        populate: [
          {
            path: "author",
            select: "_id firstName lastName createdAt username avatar",
            populate: [{ path: "avatar" }],
          },
          { path: "post" },
        ],
      })
      .populate({
        path: "comments",
        populate: [
          { path: "author" },
          {
            path: "reactions",
            populate: [
              {
                path: "author",
                select: "_id firstName lastName createdAt username avatar",
                populate: [{ path: "avatar" }],
              },
              { path: "comment" },
            ],
          },
        ],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "files",
      })
      .then((post) => {
        res.status(200).json({ error: false, data: post });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { userId } = req.userData;

    await Post.find()
      .populate({
        path: "author",
        select: "_id firstName lastName createdAt username avatar",
        populate: [{ path: "avatar" }],
      })
      .populate({
        path: "reactions",
        populate: [
          {
            path: "author",
            select: "_id firstName lastName createdAt username avatar",
            populate: [{ path: "avatar" }],
          },
        ],
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "author",
            select: "_id firstName lastName createdAt username avatar",
            populate: [{ path: "avatar" }],
          },
          {
            path: "reactions",
            populate: [
              {
                path: "author",
                select: "_id firstName lastName createdAt username avatar",
                populate: [{ path: "avatar" }],
              },
              { path: "comment" },
            ],
          },
        ],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "files",
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .then((post) => {
        res.status(200).json({ error: false, data: post });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
