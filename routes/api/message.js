import express from "express";
import { messageController } from "../../controllers/main-controllers";
import { helpers, validator } from "../../middleware/main-middleware";

const router = express.Router();

router.post("/getMessages", helpers.checkAuth, messageController.getMessages);

export default router;
