import CONVERSATION from "../database/CONVERSATION";

export const createConversation = async (req, res) => {
  try {
    const { userId } = req.userData;
    await CONVERSATION.createConversation({ body: req.body, userId })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const { userId } = req.userData;

    await CONVERSATION.getConversation({ conversationId, userId })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { userId } = req.userData;
    await CONVERSATION.getConversations({ userId })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((err) =>
        res.status(500).json({ error: true, message: err.message })
      );
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
