import swaggerUi from "swagger-ui-express";
import createError from "http-errors";

import swaggerDocument from "../swagger.json";
import usersRouter from "../routes/api/user";
import postsRouter from "../routes/api/post";
import reactionsRouter from "../routes/api/reaction";
import commentsRouter from "../routes/api/comment";
import conversationsRouter from "../routes/api/conversation";
import friendRequestRouter from "../routes/api/friendRequest";
import messagesRouter from "../routes/api/message";
import notificationRouter from "../routes/api/notification";
import publicRouter from "../routes/api/public";

function AppRouter(app) {
  app.get("/404", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "NotFound.html"));
  });

  app.get("/", (req, res) => {
    res.redirect("http://localhost:3000");
  });

  app.use("/api/user/", usersRouter);
  app.use("/api/post/", postsRouter);
  app.use("/api/reaction/", reactionsRouter);
  app.use("/api/comment/", commentsRouter);
  app.use("/api/conversation/", conversationsRouter);
  app.use("/api/message/", messagesRouter);
  app.use("/api/notification/", notificationRouter);
  app.use("/api/friend-request", friendRequestRouter);
  app.use("/api/", publicRouter);

  // Swagger
  const options = {
    explorer: true,
  };
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );

  app.get("/auth/reset/password/:jwt", function (req, res) {
    return res.status(404).json({ message: "go to port 3000" });
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = process.env.NODE_ENV === "development" ? err : {};
    //   console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  });
}

export default AppRouter;
