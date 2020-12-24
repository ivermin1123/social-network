import MESSAGE from "../../database/MESSAGE";

export const getMessages = async (req, res) => {
  try {
    const { conversationId, currentPage } = req.body;
    const { userId } = req.userData;

    const infoMessages = await MESSAGE.getMessages({
      conversationId,
      currentPage,
    }).catch((error) => {
      res.status(500).json(infoMessages);
    });
    res.status(200).json({ error: false, data: infoMessages });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
