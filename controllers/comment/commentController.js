import COMMENT from "../../database/COMMENT";

export const commentOnPost = async (req, res) => {
  try {
    const { postId, parent, content } = req.body;
    const { userId } = req.userData;

    await COMMENT.commentOnPost({
      postId,
      parent,
      content,
      userId,
    }).then((data) => {
      res.status(200).json({ error: false, data });
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    const { userId } = req.userData;

    await COMMENT.deleteComment({
      postId,
      commentId,
      userId,
    })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};
