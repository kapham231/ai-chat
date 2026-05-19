import express from "express";
import { sendMessage } from "../controllers/chat.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { sendMessageSchema } from "../middlewares/validate.schemas.js";

const router = express.Router();

router.post("/", validate(sendMessageSchema), sendMessage);

export default router;