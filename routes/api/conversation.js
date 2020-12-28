import express from "express";
import { conversationController } from "../../controllers/main-controllers";
import { helpers, validator } from "../../middleware/main-middleware";

const router = express.Router();

router.post(
  "/addConversation",
  helpers.checkAuth,
  validator.conversationValidator.addConversation,
  conversationController.createConversation
);

router.post(
  "/getConversation",
  helpers.checkAuth,
  validator.conversationValidator.getConversation,
  conversationController.getConversation
);

router.get(
  "/getConversations",
  helpers.checkAuth,
  conversationController.getConversations
);

export default router;
