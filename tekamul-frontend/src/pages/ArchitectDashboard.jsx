import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import KanbanBoard from '../components/KanbanBoard';
import TaskService from '../services/task.service';
import { PenTool, Bell, MessageSquare, LayoutDashboard } from 'lucide-react';

const ArchitectDashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await TaskService.getMyTasks();
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                            <PenTool className="text-primary" /> Architect Workspace
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">Design blueprints and sketches for your assigned projects.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:border-primary transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </div>

                <KanbanBoard tasks={tasks} onTaskUpdate={fetchTasks} />
            </div>
        </div>
    );
};

export default ArchitectDashboard;
