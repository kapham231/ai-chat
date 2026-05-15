import express from "express";
import { generateAIResponse } from "../services/ai.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await generateAIResponse("Hello Gemini");

        res.json({
            success: true,
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;