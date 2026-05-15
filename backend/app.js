import express from "express";
import cors from "cors";

import chatRoutes from "./src/routes/chat.routes.js";
import conversationRoutes from "./src/routes/conversation.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);

export default app;