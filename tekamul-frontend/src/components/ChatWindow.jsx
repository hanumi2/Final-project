import React, { useState, useEffect, useRef } from 'react';
import ChatService from '../services/chat.service';
import { useAuth } from '../context/AuthContext';
import { Send, User, X, MessageSquare, Clock } from 'lucide-react';

const ChatWindow = ({ partnerId, partnerName, onClose }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();

    const fetchMessages = async () => {
        try {
            const res = await ChatService.getConversation(partnerId);
            setMessages(res.data);
        } catch (err) {
            console.error("Failed to fetch messages");
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Polling for simplicity
        return () => clearInterval(interval);
    }, [partnerId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await ChatService.sendMessage(partnerId, newMessage);
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error("Failed to send message");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 w-96 max-w-[90vw] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500 z-50">
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {partnerName[0].toUpperCase()}
                    </div>
                    <div>
                        <h4 className="font-bold">{partnerName}</h4>
                        <p className="text-[10px] opacity-80">Consultancy Chat</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender.id === user.id ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${msg.sender.id === user.id
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none'
                            }`}>
                            {msg.message}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
                <div ref={scrollRef}></div>
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-slate-50 dark:bg-slate-800 shrink-0 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 bg-white dark:bg-slate-900 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary dark:text-white"
                />
                <button
                    type="submit"
                    className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all shadow-lg"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
