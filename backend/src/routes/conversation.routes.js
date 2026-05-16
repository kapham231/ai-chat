import express from "express";
import {
    createConversation,
    getConversationMessages,
    getConversations,
    deleteConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/:id/messages", getConversationMessages);
router.get("/", getConversations);
router.delete("/:id", deleteConversation);

export default router;