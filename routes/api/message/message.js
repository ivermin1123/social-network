import express from "express";
import { messageController } from "../../../controllers/main-controllers";
import { helpers, validator } from "../../../middleware/main-middleware";

const router = express.Router();

router.get(
  "/getMessages/:conversationId",
  helpers.checkAuth,
  messageController.getMessages
);

router.post(
  "/sendMessage",
  helpers.checkAuth,
  validator.messageValidator.sendMessage,
  messageController.sendMessage
);

export default router;
