import { useState, useRef } from "react";

import UploadButton from "./UploadButton";

const ChatInput = ({
    onSendMessage,
}) => {
    const [prompt, setPrompt] = useState("");
    const [attachments, setAttachments] = useState([]);
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (!prompt.trim() && attachments.length === 0) return;

        onSendMessage(prompt, attachments);

        setPrompt("");
        setAttachments([]);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleUploadSuccess = (fileData) => {
        setAttachments(prev => [...prev, fileData]);
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
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

    const handleTextareaChange = (e) => {
        setPrompt(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="flex flex-col gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-lg shadow-slate-200/40 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
            {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border-b border-slate-100 mb-1">
                    {attachments.map((file, idx) => {
                        const isImage = file.mimetype?.startsWith("image/");
                        if (isImage) {
                            return (
                                <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 group">
                                    <img 
                                        src={`${import.meta.env.VITE_API_BASE_URL}/${file.path}`} 
                                        alt={file.filename} 
                                        className="w-full h-full object-cover"
                                    />
                                    <button 
                                        onClick={() => removeAttachment(idx)}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 group">
                                <span className="max-w-[150px] truncate">{file.filename}</span>
                                <button 
                                    onClick={() => removeAttachment(idx)}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            
            <div className="flex gap-3 items-end">
                <UploadButton onUploadSuccess={handleUploadSuccess} />

                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={prompt}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="flex-1 py-2 px-1 bg-transparent border-none resize-none outline-none text-sm text-slate-700 placeholder:text-slate-400 min-h-[40px] max-h-32"
                />

                <button
                    onClick={handleSend}
                    disabled={!prompt.trim() && attachments.length === 0}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        prompt.trim() || attachments.length > 0
                            ? "bg-blue-800 text-white shadow-md shadow-blue-900/20 hover:bg-blue-900 scale-100 active:scale-95"
                            : "bg-slate-100 text-slate-400 scale-95 cursor-not-allowed"
                    }`}
                >
                    <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatInput;