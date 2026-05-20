import express from "express";

import upload, { MAX_FILE_SIZE_MB } from "../middlewares/upload.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
    "/",
    (req, res, next) => {
        upload.single("file")(req, res, (err) => {
            if (err) {
                let message = err.message;
                if (err.code === "LIMIT_FILE_SIZE") {
                    message = `File too large. Maximum size allowed is ${MAX_FILE_SIZE_MB}MB.`;
                }
                return res.status(400).json({
                    success: false,
                    message: message,
                });
            }
            next();
        });
    },
    uploadFile
);

export default router;