import NOTIFY from "../database/NOTIFY";

export const getUserNotify = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { currentPage } = req.body;

    const total = await NOTIFY.getUserTotalNotify({ userId }).catch((error) => {
      return res.status(500).json({ error: true, message: error });
    });
    await NOTIFY.getUserNotify({ userId, currentPage })
      .then((data) => {
        res
          .status(200)
          .json({ error: false, data, totalNotify: total.totalNotify });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
