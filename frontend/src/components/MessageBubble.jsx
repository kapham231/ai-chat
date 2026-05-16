import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ message }) => {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex mb-6 ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >
            <div className={`flex max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
                {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mb-1 border border-slate-200">
                        <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                <div
                    className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden ${isUser
                        ? "bg-blue-800 text-white rounded-br-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                        }`}
                >
                    {message.content && (
                        <div className={`markdown-content ${message.attachments?.length > 0 ? "mb-3" : ""}`}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}

                    {message.attachments && message.attachments.length > 0 && (
                        <div className={`flex flex-col gap-2 ${message.content ? `pt-2 border-t ${isUser ? "border-blue-700" : "border-slate-50"}` : ""}`}>
                            {message.attachments.map((file, idx) => (
                                <a
                                    key={idx}
                                    href={`${import.meta.env.VITE_API_BASE_URL}/${file.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isUser
                                            ? "bg-blue-700/50 hover:bg-blue-700 text-blue-100"
                                            : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    <span className="text-xs font-medium truncate max-w-[200px]">{file.filename}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;