import express from "express";
import { sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

// router.post("/", async (req, res) => {
//     res.json({
//         success: true,
//         message: "Chat route working",
//     });
// });

router.post("/", sendMessage);

export default router;