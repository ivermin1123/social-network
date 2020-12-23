import POST from "../../database/POST";

export const createPost = async (req, res) => {
  try {
    const { userId } = req.userData;

    const infoAfterInsert = await POST.createPost({
      body: req.body,
      userId,
    }).catch((error) => {
      return res.status(500).json({ error: true, message: error.message });
    });

    await POST.getPostById({ postId: infoAfterInsert._id })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.body;

    await POST.getPostById({ postId })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    // const { userId } = req.userData;
    await POST.getPosts()
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { userId: userIdGet } = req.body;

    const userIdQuery = userIdGet || userId;

    await POST.getUserPosts({ userId: userIdQuery })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { postId } = req.body;

    await POST.deletePost({ postId, userId })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { userId } = req.userData;

    await POST.editPost({ body: req.body, userId })
      .then((data) => {
        res.status(200).json({ error: false, data });
      })
      .catch((error) => {
        res.status(500).json({ error: true, message: error });
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
