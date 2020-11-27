import mongoose from "mongoose";

const User = mongoose.model("User");

export default (req, res, next) => {
    User.findById(req.body.userId)
        .then((user) => {
            if (!user)
                return res.status(404).json({ message: "User not found" });
            next();
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(500).json({ message: err.message });
        });
};
