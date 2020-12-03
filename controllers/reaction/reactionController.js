import mongoose from "mongoose";
import _ from "lodash";
import { checkObjectIDs } from "../../utils/db-check";

import "../../models/Post";
import "../../models/Reaction";

const Post = mongoose.model("Post");
const Reaction = mongoose.model("Reaction");

/**
 * Type:
 * 1: Like
 * 2: Haha
 * 3:
 * 4:
 */
export const likePost = async (req, res) => {
  try {
    const { postId, type } = req.body;
    const { userId } = req.userData;

    if (!checkObjectIDs(postId))
      res.status(500).json({ error: true, message: "param_invalid" });

    const infoPost = await Post.findById(postId);
    if (!infoPost)
      res.status(500).json({ error: true, message: "post_not_found" });

    const listReaction = await Reaction.find({ post: postId });
    const checkLike = _.some(listReaction, { author: userId });

    if (checkLike) {
      const reaction = listReaction.filter(
        (reaction) => reaction.author == userId
      );
      const infoPostAfterUnlike = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { reactions: reaction._id } }
      );
      if (!infoPostAfterUnlike)
        res.status(500).json({ error: true, message: "cannot_update" });
      await Reaction.deleteOne({ _id: reaction._id })
        .then((reaction) => {
          res.status(200).json({ error: false, data: infoPostAfterUnlike });
        })
        .catch((error) => {
          res.status(500).json({ error: true, message: error.message });
        });
    } else {
      let newReaction = new Reaction({
        author: userId,
        post: postId,
        type,
      });

      const infoNewReaction = await newReaction.save().catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });

      await Post.findByIdAndUpdate(
        postId,
        {
          $push: { reactions: infoNewReaction._id },
        },
        { new: true }
      )
        .then((post) => {
          res.status(200).json({ error: false, data: post });
        })
        .catch((error) => {
          res.status(500).json({ error: true, message: error.message });
        });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
