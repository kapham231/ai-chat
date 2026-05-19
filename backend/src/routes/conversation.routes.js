import express from "express";
import {
    createConversation,
    getConversationMessages,
    getConversations,
    deleteConversation,
} from "../controllers/conversation.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { getMessagesSchema, deleteConversationSchema } from "../middlewares/validate.schemas.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/:id/messages", validate(getMessagesSchema), getConversationMessages);
router.get("/", getConversations);
router.delete("/:id", validate(deleteConversationSchema), deleteConversation);

export default router;