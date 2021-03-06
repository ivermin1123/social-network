import USER from "../database/USER";

export async function updateUserImage(req, res) {
  try {
    const { userId } = req.userData;
    const { files } = req.body;

    const infoUserAfterUpdate = await USER.updateUserImage({
      userId,
      files,
    }).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json({ error: false, data: infoUserAfterUpdate });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}

export async function addUser(req, res) {
  try {
    const infoUserAfterUpdate = await USER.insert({
      body: req.body,
    }).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json({ error: false, data: infoUserAfterUpdate });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    await USER.login({
      email,
      password,
    })
      .then((user) => {
        req.body.user = user;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
}

export const sendUserData = (req, res) => {
  return res.status(200).json({ user: req.body.user });
};

export const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const { userId } = req.userData;

    const infoUser = await USER.changePassword({
      password,
      newPassword,
      userId,
    }).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json({ error: false, data: infoUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { userId } = req.userData;

    const infoUser = await USER.getUsers({
      userId,
    }).catch((error) => {
      res.status(500).json(error);
    });
    res.status(200).json({ error: false, data: infoUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { userId: userIdGet } = req.body;
    const userIdToGet = userIdGet ? userIdGet : userId;
    await USER.getUser({
      userIdToGet,
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

export async function searchUser(req, res) {
  try {
    const { key } = req.body;
    const infoUserAfterUpdate = await USER.searchUser({
      key,
    }).catch((error) => {
      return res.status(200).json(error);
    });
    res.status(200).json({ error: false, data: infoUserAfterUpdate });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}

export async function updateUserInformation(req, res) {
  try {
    const { userId } = req.userData;
    const { body } = req.body;
    await USER.updateUserInformation({
      userId,
      body,
    }).catch((error) => {
      return res.status(500).json(error);
    });

    await USER.getUser({
      userIdToGet: userId,
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
}
