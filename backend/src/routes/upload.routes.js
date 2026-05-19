import express from "express";

import upload from "../middlewares/upload.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
    "/",
    (req, res, next) => {
        upload.single("file")(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            next();
        });
    },
    uploadFile
);

export default router;