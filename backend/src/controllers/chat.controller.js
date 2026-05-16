import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { generateAIResponse } from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
    try {
        const { conversationId, prompt, attachments } = req.body;

        if (!conversationId || (!prompt && !attachments)) {
            return res.status(400).json({
                success: false,
                message: "conversationId and either prompt or attachments are required",
            });
        }

        // Save user message
        const userMessage = await Message.create({
            conversationId,
            role: "user",
            content: prompt || "",
            attachments: attachments || [],
        });

        // Update conversation title if still default
        const conversation = await Conversation.findById(
            conversationId
        );

        if (
            conversation.title ===
            "New Conversation"
        ) {
            conversation.title =
                prompt.trim().slice(0, 30);

            await conversation.save();
        }

        // Prepare prompt for AI
        let aiPrompt = prompt;
        if (attachments && attachments.length > 0) {
            const fileNames = attachments.map(a => a.filename).join(", ");
            aiPrompt = `[User uploaded files: ${fileNames}]\n${prompt || "Discuss the uploaded files."}`;
        }

        // Generate AI response
        const aiResponse = await generateAIResponse(aiPrompt);

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