const Sidebar = ({
    conversations,
    createConversation,
    onSelectConversation,
    selectedConversation
}) => {
    return (
        <div className="w-72 border-r p-4">
            <h1 className="text-2xl font-bold mb-4">
                AI Chat
            </h1>

            <button
                onClick={createConversation}
                className="w-full bg-black text-white py-2 rounded-lg mb-4"
            >
                New Chat
            </button>

            <div className="space-y-2">
                {conversations.map((conversation) => (
                    <div
                        key={conversation._id}
                        onClick={() =>
                            onSelectConversation(conversation)
                        }
                        className={`p-3 rounded-lg cursor-pointer ${selectedConversation?._id ===
                            conversation._id
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {conversation.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;