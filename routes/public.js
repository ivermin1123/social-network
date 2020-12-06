import express from "express";
import { uploadFile_S3 } from "../controllers/upload-s3-controller";
import { helpers } from "../middleware/main-middleware";

const router = express.Router();

router.post("/generate-link-upload-s3", helpers.checkAuth, uploadFile_S3);

export default router;
