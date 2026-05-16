import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { generateAIResponse } from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
    try {
        const { conversationId, prompt } = req.body;

        if (!conversationId || !prompt) {
            return res.status(400).json({
                success: false,
                message: "conversationId and prompt are required",
            });
        }

        // Save user message
        const userMessage = await Message.create({
            conversationId,
            role: "user",
            content: prompt,
        });

        // Generate AI response
        const aiResponse = await generateAIResponse(prompt);

        // Save AI message
        const assistantMessage = await Message.create({
            conversationId,
            role: "assistant",
            content: aiResponse,
        });

        // Update conversation timestamp (so it shows up last in history)
        await Conversation.findByIdAndUpdate(
            conversationId,
            {
                updatedAt: new Date(),
            }
        );

        res.status(200).json({
            success: true,
            data: {
                userMessage,
                assistantMessage,
            },
        });
    } catch (error) {
        console.error("Send Message Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};