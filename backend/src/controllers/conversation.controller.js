import Conversation from "../models/conversation.model.js";

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