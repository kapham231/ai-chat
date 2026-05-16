const Sidebar = ({
    conversations,
    createConversation,
    onSelectConversation,
    selectedConversation,
    onDeleteConversation
}) => {
    return (
        <div className="w-72 border-r p-4 flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4">
                AI Chat
            </h1>

            <button
                onClick={createConversation}
                className="w-full bg-black text-white py-2 rounded-lg mb-4"
            >
                + New Chat
            </button>

            <div className="space-y-2 flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <div
                        key={conversation._id}
                        onClick={() =>
                            onSelectConversation(conversation)
                        }
                        className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group ${selectedConversation?._id ===
                            conversation._id
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        <span className="truncate flex-1 mr-2">
                            {conversation.title}
                        </span>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteConversation(conversation._id);
                            }}
                            className={`p-1 rounded hover:bg-red-500 hover:text-white transition-colors ${
                                selectedConversation?._id === conversation._id
                                    ? "text-gray-400"
                                    : "text-gray-400 group-hover:text-red-500"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;