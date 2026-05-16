import { useState } from "react";

const ChatInput = ({
    onSendMessage,
}) => {
    const [prompt, setPrompt] = useState("");

    const handleSend = () => {
        if (!prompt.trim()) return;

        onSendMessage(prompt);

        setPrompt("");
    };

    return (
        <div className="flex gap-2">
            <textarea
                rows={2}
                value={prompt}
                onChange={(e) =>
                    setPrompt(e.target.value)
                }
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