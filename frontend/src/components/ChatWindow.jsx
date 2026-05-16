import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatWindow = ({
    messages,
    onSendMessage,
    selectedConversation,
    loading,
}) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    if (!selectedConversation) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                Select a conversation to start chatting
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Start a conversation
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
                    <div className="text-gray-500 text-sm">
                        AI is thinking...
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className="border-t p-4">
                <ChatInput
                    onSendMessage={onSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatWindow;