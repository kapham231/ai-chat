import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateAIResponse = async (messages) => {
    try {
        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: messages,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("AI Generation Error:", error);

        if (error.status === 429) {
            throw new Error("AI provider quota exceeded or rate limited. Please try again later.");
        }
        throw new Error(error.message || "Failed to generate AI response");
    }
};