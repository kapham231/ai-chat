import express from "express";
import cors from "cors";

import chatRoutes from "./src/routes/chat.routes.js";
import conversationRoutes from "./src/routes/conversation.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static("uploads")); // To serve uploaded files in Frontend

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/upload", uploadRoutes);

export default app;