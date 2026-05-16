import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Create new conversation
export const createConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            title: "New Conversation",
        });

        res.status(201).json({
            success: true,
            data: conversation,
        });
    } catch (error) {
        console.error("Create Conversation Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get conversation messages
export const getConversationMessages = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Message.find({
            conversationId: id,
        }).sort({
            createdAt: 1,
        });

        res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (error) {
        console.error("Get Messages Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all conversations (for conversation history in sidebar)
export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find().sort({
            updatedAt: -1,
        });

        res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        console.error("Get Conversations Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};