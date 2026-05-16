const MessageBubble = ({ message }) => {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex mb-6 ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >
            <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
                {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mb-1 border border-slate-200">
                        <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                
                <div
                    className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isUser
                        ? "bg-blue-800 text-white rounded-br-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                        }`}
                >
                    {message.content}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;