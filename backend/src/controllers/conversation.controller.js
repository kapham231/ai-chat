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
        
        // Page and limit are already parsed as numbers by Zod validator!
        const page = req.query.page || 1;
        const limit = req.query.limit || 50; 
        const skip = (page - 1) * limit;

        const totalMessages = await Message.countDocuments({
            conversationId: id,
        });

        // 1. Sort newest first (-1) to paginate starting from the most recent messages
        // 2. Apply skip and limit
        const messages = await Message.find({
            conversationId: id,
        })
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

        // 3. Reverse back to chronological order (oldest to newest) for frontend rendering
        const chronologicalMessages = messages.reverse();

        res.status(200).json({
            success: true,
            data: chronologicalMessages,
            pagination: {
                page,
                limit,
                totalMessages,
                totalPages: Math.ceil(totalMessages / limit),
                hasMore: skip + messages.length < totalMessages,
            }
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

// Delete conversation
export const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;

        await Conversation.findByIdAndDelete(id);

        await Message.deleteMany({
            conversationId: id,
        });

        res.status(200).json({
            success: true,
            message: "Conversation deleted successfully",
        });
    } catch (error) {
        console.error("Delete Conversation Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};