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
        <div className="flex gap-3 items-end bg-white border border-slate-200 rounded-2xl p-2 shadow-lg shadow-slate-200/40 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
            <UploadButton />

            <textarea
                rows={1}
                value={prompt}
                onChange={(e) =>
                    setPrompt(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 py-2 px-1 bg-transparent border-none resize-none outline-none text-sm text-slate-700 placeholder:text-slate-400 min-h-[40px] max-h-32"
            />

            <button
                onClick={handleSend}
                disabled={!prompt.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    prompt.trim()
                        ? "bg-blue-800 text-white shadow-md shadow-blue-900/20 hover:bg-blue-900 scale-100 active:scale-95"
                        : "bg-slate-100 text-slate-400 scale-95 cursor-not-allowed"
                }`}
            >
                <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </div>
    );
};

export default ChatInput;