import React, { useState, useEffect } from 'react';
import ProjectService from '../services/project.service';
import { Truck, CheckCircle, FileCheck, MapPin, Package, Bell, MessageSquare } from 'lucide-react';

const MessengerDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReadyProjects = async () => {
        const res = await ProjectService.getAllProjects();
        // Filter projects that are at MESSENGER_APPROVAL stage
        setProjects(res.data.filter(p => p.status === 'MESSENGER_APPROVAL'));
    };

    useEffect(() => {
        fetchReadyProjects();
    }, []);

    const handleFinalApprove = async (id) => {
        setLoading(true);
        try {
            await ProjectService.updateStatus(id, 'FINAL_BLUEPRINT_READY');
            fetchReadyProjects();
        } catch (err) {
            console.error("Approval failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-4 bg-secondary/10 rounded-2xl">
                        <Truck className="text-secondary" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Messenger Dispatch</h2>
                        <p className="text-slate-500 font-medium">Final approval and document dispatching.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold dark:text-white">Pending Approvals</h3>
                            <span className="bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                {projects.length} Awaiting
                            </span>
                        </div>
                        <div className="p-0 max-h-[600px] overflow-y-auto">
                            {projects.length === 0 ? (
                                <div className="p-12 text-center">
                                    <Package className="mx-auto mb-4 text-slate-200" size={48} />
                                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No pending dispatches</p>
                                </div>
                            ) : (
                                projects.map(p => (
                                    <div key={p.id} className="p-8 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-500">
                                                    #{p.id}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white text-lg">Blueprint Set: {p.client.username}</p>
                                                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                                        <MapPin size={12} /> Main HQ to Client
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleFinalApprove(p.id)}
                                                disabled={loading}
                                                className="px-6 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-xl hover:scale-[1.05] transition-all disabled:opacity-50"
                                            >
                                                Mark as Ready
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Architecture</p>
                                                <p className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Verified</p>
                                            </div>
                                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Structural</p>
                                                <p className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Verified</p>
                                            </div>
                                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Hydraulic</p>
                                                <p className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Verified</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                            <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                                <Activity className="text-secondary" /> Performance
                            </h3>
                            <p className="text-slate-400 text-sm font-medium mb-8">Average approval time: 4.2 hours</p>
                            <div className="flex items-end gap-2 h-24">
                                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                    <div key={i} className="flex-1 bg-secondary/30 rounded-t-lg relative group">
                                        <div className="absolute bottom-0 left-0 right-0 bg-secondary rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
                                <Bell size={20} className="text-amber-500" /> Notifications
                            </h3>
                            <div className="space-y-4">
                                {[
                                    "New project ready for scan",
                                    "PM requested urgent approval for #104",
                                    "System update scheduled for 2 AM"
                                ].map((m, i) => (
                                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs font-medium text-slate-600 dark:text-slate-400 border-l-4 border-secondary">
                                        {m}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessengerDashboard;
