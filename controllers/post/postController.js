import mongoose from "mongoose";
import { checkObjectIDs } from "../../utils/db-check";

import multer from "multer";

import "../../models/Post";
import "../../models/Reaction";
import "../../models/Comment";
import "../../models/User";

const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

const Post = mongoose.model("Post");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
}

function arrayRemove(array, value) {
  return array.filter((item) => {
    return item._id.toString() !== value.toString();
  });
}

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: (req, file, cb) => {
    cb(null, "./public/images/post-images/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, uuidv4() + "." + ext);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 10485760, //10 MB
  },
}).single("photo");

export const createPost = async (req, res) => {
  try {
    const { image, description, coordinates, locationName, tags } = req.body;

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

    let imageUrl, imagePublicId;
    if (image) {
      const { createReadStream } = await image;
      const stream = createReadStream();
      const uploadImage = await uploadToCloudinary(stream, "post");

      if (!uploadImage.secure_url) {
        throw new Error(
          "Something went wrong while uploading image to Cloudinary"
        );
      }

      imageUrl = uploadImage.secure_url;
      imagePublicId = uploadImage.public_id;
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
        image: imageUrl,
        imagePublicId,
        //: JSON.parse(tags),
      });
    } else {
      newPost = new Post({
        author: req.userData.userId,
        description: description,
        hashtags: [...new Set(hashtags)], // remove duplicates
        image: imageUrl,
        imagePublicId,
        // tags: JSON.parse(tags),
      });
    }

    await newPost
      .save()
      .then((post) => {
        res.status(200).json({ error: false, data: post });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!checkObjectIDs(postId))
      res.status(500).json({ error: true, message: "param_invalid" });
    const infoPost = await Post.findById(postId)
      .populate({ path: "author" })
      .populate({
        path: "reactions",
        populate: [{ path: "author" }, { path: "post" }],
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
      });

    if (!infoPost) res.status(500).json({ error: true, message: "cannot_get" });
    res.status(200).json({ error: false, data: infoPost });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
