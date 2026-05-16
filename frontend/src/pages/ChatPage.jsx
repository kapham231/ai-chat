import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

import api from "../services/api";

const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await api.get("/conversations");
            console.log(response.data);
            setConversations(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMessages = async (
        conversationId
    ) => {
        try {
            const response = await api.get(
                `/conversations/${conversationId}/messages`
            );

            setMessages(response.data.data);
        } catch (error) {
            console.error(error);
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
            alert("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConversation = async (id) => {
        if (!window.confirm("Are you sure you want to delete this conversation?")) return;

        try {
            await api.delete(`/conversations/${id}`);
            
            setConversations(prev => prev.filter(c => c._id !== id));
            
            if (selectedConversation?._id === id) {
                setSelectedConversation(null);
                setMessages([]);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete conversation");
        }
    };

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
                    onOpenSidebar={() => setSidebarOpen(true)}
                />
            </div>
        </div>
    );
};

export default ChatPage;