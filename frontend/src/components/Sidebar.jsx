const Sidebar = ({
    conversations,
    createConversation,
    onSelectConversation,
    selectedConversation,
    onDeleteConversation
}) => {
    return (
        <div className="w-80 bg-slate-900 text-slate-300 p-4 flex flex-col h-full shadow-2xl z-20">
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                    AI Chat
                </h1>
            </div>

            <button
                onClick={createConversation}
                className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl mb-8 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 border border-blue-600/50"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Chat
            </button>

            <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-3">History</p>
                {conversations.map((conversation) => (
                    <div
                        key={conversation._id}
                        onClick={() =>
                            onSelectConversation(conversation)
                        }
                        className={`p-3.5 rounded-xl cursor-pointer flex justify-between items-center group transition-all duration-200 border ${selectedConversation?._id ===
                            conversation._id
                            ? "bg-blue-700/20 text-white border-blue-500/30 ring-1 ring-blue-500/20"
                            : "bg-transparent border-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        <span className="truncate flex-1 text-sm font-medium mr-2">
                            {conversation.title}
                        </span>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteConversation(conversation._id);
                            }}
                            className={`p-1.5 rounded-lg transition-all ${selectedConversation?._id === conversation._id
                                ? "text-blue-400 hover:bg-blue-500 hover:text-white"
                                : "text-slate-600 hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100"
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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