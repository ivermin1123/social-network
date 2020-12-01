import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    console.log(req);
    //const token = req.token;
    const token = req.get("Authorization").split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default checkAuth;
