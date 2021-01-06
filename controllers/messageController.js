import MESSAGE from "../database/MESSAGE";

export const getMessages = async (req, res) => {
  try {
    const { conversationId, currentPage } = req.body;
    const { userId } = req.userData;

    await MESSAGE.getMessages({
      conversationId,
      currentPage,
    })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
