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

router.post(
  "/getConversationId",
  helpers.checkAuth,
  validator.conversationValidator.getConversationId,
  conversationController.getConversationId
);

export default router;
