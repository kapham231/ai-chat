import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { toast } from "react-hot-toast";

import api from "../services/api";

const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await api.get("/conversations");
            // console.log(response.data);
            const convs = response.data.data;
            setConversations(convs);

            const savedId = sessionStorage.getItem("activeConversationId");
            if (savedId && convs.length > 0) {
                const activeConv = convs.find(c => c._id === savedId);
                if (activeConv) {
                    setSelectedConversation(activeConv);
                    await fetchMessages(activeConv._id);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsInitialLoading(false);
        }
    };

    const fetchMessages = async (
        conversationId
    ) => {
        try {
            setMessagesLoading(true);
            const response = await api.get(
                `/conversations/${conversationId}/messages`
            );

            setMessages(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setMessagesLoading(false);
        }
    };

    const createConversation = async () => {
        try {
            const response = await api.post(
                "/conversations"
            );

            const newConversation =
                response.data.data;

            setConversations((prev) => [
                newConversation,
                ...prev,
            ]);

            setSelectedConversation(
                newConversation
            );
            sessionStorage.setItem("activeConversationId", newConversation._id);

            setMessages([]);
            setSidebarOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectConversation = (
        conversation
    ) => {
        setSelectedConversation(conversation);
        sessionStorage.setItem("activeConversationId", conversation._id);

        fetchMessages(conversation._id);
        setSidebarOpen(false);
    };

    const sendMessage = async (
        prompt,
        attachments = []
    ) => {
        if (!selectedConversation)
            return;

        const tempUserMessage = {
            _id: "temp-" + Date.now(),
            role: "user",
            content: prompt,
            attachments: attachments,
        };

        try {
            setLoading(true);
            setMessages((prev) => [...prev, tempUserMessage]);

            const response = await api.post(
                "/chat",
                {
                    conversationId:
                        selectedConversation._id,
                    prompt,
                    attachments,
                }
            );

            const {
                userMessage,
                assistantMessage,
            } = response.data.data;

            setMessages((prev) => [
                ...prev.filter(m => m._id !== tempUserMessage._id),
                userMessage,
                assistantMessage,
            ]);

            fetchConversations();
        } catch (error) {
            console.error(error);
            setMessages((prev) => prev.filter(m => m._id !== tempUserMessage._id));
            toast.error("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    const executeDelete = async (id) => {
        try {
            await api.delete(`/conversations/${id}`);

            setConversations(prev => prev.filter(c => c._id !== id));

            if (selectedConversation?._id === id) {
                setSelectedConversation(null);
                sessionStorage.removeItem("activeConversationId");
                setMessages([]);
            }
            toast.success("Conversation deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete conversation");
        }
    };

    const handleDeleteConversation = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3 p-1">
                <p className="text-sm font-semibold text-slate-800">
                    Are you sure you want to delete this conversation?
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            await executeDelete(id);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
            position: "top-center",
            style: {
                minWidth: "320px",
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                borderRadius: "1rem",
                border: "1px solid #f1f5f9",
                padding: "12px",
            }
        });
    };

    if (isInitialLoading) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100/60"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">Loading app...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex relative">
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - always visible on md+, slide-in on mobile */}
            <div
                className={`
                    fixed md:relative inset-y-0 left-0 z-40
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:block
                `}
            >
                <Sidebar
                    conversations={conversations}
                    createConversation={createConversation}
                    onSelectConversation={
                        handleSelectConversation
                    }
                    selectedConversation={selectedConversation}
                    onDeleteConversation={handleDeleteConversation}
                    onClose={() => setSidebarOpen(false)}
                />
            </div>

            <div className="flex-1 min-w-0">
                <ChatWindow
                    messages={messages}
                    onSendMessage={sendMessage}
                    selectedConversation={
                        selectedConversation
                    }
                    loading={loading}
                    messagesLoading={messagesLoading}
                    onOpenSidebar={() => setSidebarOpen(true)}
                />
            </div>
        </div>
    );
};

export default ChatPage;