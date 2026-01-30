import React, { useState, useEffect } from 'react';
import NotificationService from '../services/notification.service';
import { Bell, X, Info, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationTray = ({ onClose }) => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifs = async () => {
        try {
            const res = await NotificationService.getMyNotifications();
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to fetch notifications");
        }
    };

    useEffect(() => {
        fetchNotifs();
    }, []);

    const handleRead = async (id) => {
        await NotificationService.markAsRead(id);
        fetchNotifs();
    };

    return (
        <div className="absolute top-16 right-0 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell size={18} className="text-primary" /> Notifications
                </h3>
                <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <X size={18} />
                </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 font-medium italic text-sm">
                        No new updates.
                    </div>
                ) : (
                    notifications.map(n => (
                        <div
                            key={n.id}
                            onClick={() => !n.read && handleRead(n.id)}
                            className={`p-5 border-b border-slate-50 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                        >
                            <div className="flex gap-4">
                                <div className={`mt-1 ${!n.read ? 'text-primary' : 'text-slate-300'}`}>
                                    {n.message.includes('complete') ? <CheckCircle size={16} /> : <Info size={16} />}
                                </div>
                                <div>
                                    <p className={`text-sm leading-relaxed ${!n.read ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                        {n.message}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-tighter">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationTray;
