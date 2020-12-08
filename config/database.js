import mongoose from "mongoose";

// Connect to database
export default function connectMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected."))
    .catch((err) => console.error(err));

  mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
  mongoose.connection.on("error", (err) => {
    console.error(err.message);
  });

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("autoIndex", false);
}
