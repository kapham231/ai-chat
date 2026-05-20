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
        let userMessage;
        userMessage = await Message.create({
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
                prompt.trim().slice(0, 50);

            await conversation.save();
        }

        // Prepare prompt for AI
        let aiPrompt = prompt;
        if (attachments && attachments.length > 0) {
            const fileNames = attachments.map(a => a.filename).join(", ");
            aiPrompt = `[User uploaded files: ${fileNames}]\n${prompt || "Discuss the uploaded files."}`;
        }

        // Fetch conversation message history for context (limit to last 20 messages)
        let history = await Message.find({ conversationId })
            .sort({ createdAt: -1 })
            .limit(10);
            
        history = history.reverse();

        // Format history for Groq/OpenAI: { role: "user" | "assistant", content: string }
        const messages = history.map((msg, idx) => {
            // For the last message (which is the one we just saved userMessage), 
            // if there are attachments, we use the prepared aiPrompt which has file context.
            if (idx === history.length - 1 && attachments && attachments.length > 0) {
                return {
                    role: "user",
                    content: aiPrompt,
                };
            }
            return {
                role: msg.role === "assistant" ? "assistant" : "user",
                content: msg.content || "",
            };
        });

        // Generate AI response
        const aiResponse = await generateAIResponse(messages);

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

        // Rollback: Delete user message if AI fails to respond
        if (userMessage && userMessage._id) {
            try {
                await Message.findByIdAndDelete(userMessage._id);
            } catch (rollbackError) {
                console.error("Failed to rollback user message:", rollbackError);
            }
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};