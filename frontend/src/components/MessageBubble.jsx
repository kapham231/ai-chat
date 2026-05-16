const MessageBubble = ({ message }) => {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex mb-4 ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >
            <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${isUser
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                    }`}
            >
                {message.content}
            </div>
        </div>
    );
};

export default MessageBubble;