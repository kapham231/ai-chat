import { useState } from "react";

import UploadButton from "./UploadButton";

const ChatInput = ({
    onSendMessage,
}) => {
    const [prompt, setPrompt] = useState("");

    const handleSend = () => {
        if (!prompt.trim()) return;

        onSendMessage(prompt);

        setPrompt("");
    };

    // Press Enter to send prompt
    const handleKeyDown = (e) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();

            handleSend();
        }
    };

    return (
        <div className="flex gap-2">
            <UploadButton />

            <textarea
                rows={2}
                value={prompt}
                onChange={(e) =>
                    setPrompt(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg p-3 resize-none outline-none"
            />

            <button
                onClick={handleSend}
                className="bg-black text-white px-5 rounded-lg"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;