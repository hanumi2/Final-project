import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import TaskService from '../services/task.service';
import { X, UserPlus, FileText, ChevronRight } from 'lucide-react';

const AssignmentModal = ({ project, onClose, onAssignSuccess }) => {
    const [role, setRole] = useState('ARCHITECT');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await UserService.getByRole(role);
            setUsers(res.data);
        };
        fetchUsers();
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !taskName) return;

        setLoading(true);
        try {
            await TaskService.assignTask(project.id, selectedUser, taskName, description, role === 'ARCHITECT' ? 'ARCHITECTURAL' : 'ENGINEERING');
            onAssignSuccess();
            onClose();
        } catch (err) {
            console.error("Assignment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <UserPlus className="text-primary" /> Assign Task
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Pick Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl font-bold text-slate-700 dark:text-white"
                            >
                                <option value="ARCHITECT" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-white">Architect</option>
                                <option value="STRUCTURAL_ENGINEER" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-white">Structural Engineer</option>
                                <option value="ELECTRICAL_ENGINEER" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-white">Electrical Engineer</option>
                                <option value="HYDRAULIC_ENGINEER" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-white">Hydraulic Engineer</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Choose Professional</label>
                            <select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                required
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl font-bold text-slate-700 dark:text-white"
                            >
                                <option value="">Select a user...</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.fullName || u.username}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Task Title</label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                required
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl font-bold text-slate-700 dark:text-white"
                                placeholder="e.g., Preliminary Sketch"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl font-medium text-slate-700 dark:text-white h-24 resize-none"
                                placeholder="Details of the work required..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {loading ? "Assigning..." : "Confirm Assignment"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignmentModal;
