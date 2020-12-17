import REACTION from "../../database/REACTION";

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

    const infoPost = await REACTION.countReaction({
      postId,
      userId,
      type,
    }).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json({ error: false, data: infoPost.data });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const countReaction = async (req, res) => {
  try {
    const { postId } = req.body;
    const data = await REACTION.countReaction({
      postId,
    }).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json({ error: false, data });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
