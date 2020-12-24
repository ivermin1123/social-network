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
    await REACTION.likePost({
      postId,
      type,
      userId,
    })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { postId, commentId, type } = req.body;
    const { userId } = req.userData;
    await REACTION.likeComment({
      postId,
      commentId,
      type,
      userId,
    })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const countReaction = async (req, res) => {
  try {
    const { typeId, typeReact } = req.body;
    const data = await REACTION.countReaction({ typeId, typeReact }).catch(
      (error) => {
        res.status(500).json(error);
      }
    );
    res.status(200).json({ error: false, data });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
