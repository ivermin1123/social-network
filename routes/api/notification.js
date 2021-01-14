import express from "express";
import { notifyController } from "../../controllers/main-controllers";
import { helpers, validator } from "../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/getUserNotify",
  helpers.checkAuth,
  notifyController.getUserNotify
);

router.post("/seenNotify", helpers.checkAuth, notifyController.seenNotify);

export default router;
