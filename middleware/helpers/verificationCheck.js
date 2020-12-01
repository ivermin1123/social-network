import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

const verificationCheck = (req, res, next) => {
  User.aggregate([
    {
      $match: {
        $or: [{ email: req.body.email }, { username: req.body.email }],
      },
    },
    {
      $project: {
        password: 1,
        activated: 1,
      },
    },
  ])
    .then((users) => {
      if (users.length < 1) {
        return res.status(400).json({ message: "Incorrect credentials." });
      } else {
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Incorrect credentials." });
          }
          if (result) {
            if (!users[0].activated) {
              return res.status(400).json({
                data: users[0],
                message: "Account not activated",
              });
            }
            return next();
          }
          return res.status(400).json({ message: "Incorrect credentials." });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err });
    });
};
export default verificationCheck;
