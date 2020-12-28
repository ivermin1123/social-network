import FRIEND_REQUEST from "../database/FRIEND_REQUEST";

export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.userData;

    await FRIEND_REQUEST.sendFriendRequest({
      sendTo: req.body,
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

    await FRIEND_REQUEST.acceptFriendRequest({
      requestId: req.body,
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

export const deleteFriendRequest = async (req, res) => {
  try {
    const { userId } = req.userData;

    await FRIEND_REQUEST.deleteFriendRequest({
      requestId: req.body,
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
