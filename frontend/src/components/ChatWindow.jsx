import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatWindow = ({
    messages,
    onSendMessage,
    selectedConversation,
    loading,
    onOpenSidebar,
}) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    if (!selectedConversation) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-lg gap-4">
                {/* Mobile menu button when no conversation */}
                <button
                    onClick={onOpenSidebar}
                    className="md:hidden absolute top-4 left-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                Select a conversation to start chatting
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                {/* Mobile menu button */}
                <button
                    onClick={onOpenSidebar}
                    className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors flex-shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div style={{ minWidth: 0, flex: "1 1 0" }}>
                    <h2
                        className="font-bold text-slate-800"
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {selectedConversation.title}
                    </h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs text-slate-400 font-medium">AI Active</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-2">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                            <svg className="w-8 h-8 text-blue-800/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-slate-500">No messages yet</p>
                            <p className="text-sm text-slate-400">Start a conversation with your AI assistant.</p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <MessageBubble
                            key={message._id}
                            message={message}
                        />
                    ))
                )}

                {loading && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm italic py-2">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                        AI is thinking...
                    </div>
                )}

                <div ref={bottomRef} className="h-4" />
            </div>

            <div className="p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent">
                <ChatInput
                    onSendMessage={onSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatWindow;