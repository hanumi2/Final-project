import React, { useState, useEffect } from 'react';
import ProjectService from '../services/project.service';
import UserService from '../services/user.service';
import { Shield, ShieldAlert, Users, Layers, Activity, Calendar, MoreHorizontal, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalProjects: 0, activeStaff: 0 });

    useEffect(() => {
        const fetchAll = async () => {
            const [projRes, userRes] = await Promise.all([
                ProjectService.getAllProjects(),
                UserService.getAllUsers()
            ]);
            setProjects(projRes.data);
            setUsers(userRes.data);
            setStats({
                totalUsers: userRes.data.length,
                totalProjects: projRes.data.length,
                activeStaff: userRes.data.filter(u => u.role !== 'CLIENT' && u.role !== 'ADMIN').length
            });
        };
        fetchAll();
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                        <Shield className="text-primary" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Administrator</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Global control and system oversight.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <Users />, label: "Total Users", value: stats.totalUsers, trend: "+12%" },
                        { icon: <Layers />, label: "Total Projects", value: stats.totalProjects, trend: "+5%" },
                        { icon: <Activity />, label: "System Health", value: "99.9%", trend: "Stable" },
                        { icon: <CheckCircle />, label: "Completions", value: "85%", trend: "High" },
                    ].map((card, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                                    {card.icon}
                                </div>
                                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-wider">
                                    {card.trend}
                                </span>
                            </div>
                            <p className="text-slate-500 font-bold text-xs uppercase mb-1 tracking-widest">{card.label}</p>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">{card.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Projects Feed */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold dark:text-white">Active Projects Feed</h3>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><MoreHorizontal size={20} /></button>
                            </div>
                            <div className="p-0">
                                {projects.map(p => (
                                    <div key={p.id} className="p-6 border-b border-slate-50 dark:border-slate-800 last:border-0 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-400">
                                                #{p.id}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Project by {p.client.username}</p>
                                                <p className="text-xs text-slate-500 font-medium">Status: {p.status.replace('_', ' ')}</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">Inspect</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User Management */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold dark:text-white">User Management</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {users.map(u => (
                                            <tr key={u.id}>
                                                <td className="px-6 py-4 font-bold dark:text-white">{u.username}</td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-500">{u.role}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-red-500 hover:text-red-700 font-bold text-xs">Deactivate</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">Security Logs</h3>
                            <div className="space-y-6">
                                {[
                                    { msg: "User login successful", time: "2 min ago", type: "info" },
                                    { msg: "New Project Request", time: "15 min ago", type: "success" },
                                    { msg: "Token refresh granted", time: "1 hour ago", type: "info" },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 border-l-2 border-primary/30 pl-4 py-1">
                                        <div>
                                            <p className="text-sm font-bold">{log.msg}</p>
                                            <p className="text-[10px] opacity-50 uppercase font-black">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute top--20 right--20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
