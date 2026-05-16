import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatWindow = ({
    messages,
    onSendMessage,
}) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                    />
                ))}
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