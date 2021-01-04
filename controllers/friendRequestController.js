import FRIEND_REQUEST from "../database/FRIEND_REQUEST";

export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { receiver, sender, requestId } = req.body;

    await FRIEND_REQUEST.sendFriendRequest({
      receiver,
      sender,
      requestId,
      userId,
    })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        return res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { requestId } = req.body;
    await FRIEND_REQUEST.acceptFriendRequest({
      requestId,
      userId,
    })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        return res.status(500).json({ error: true, message: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
