import React, { useState, useEffect } from 'react';
import ProjectService from '../services/project.service';
import { useAuth } from '../context/AuthContext';
import AssignmentModal from '../components/AssignmentModal';
import { LayoutDashboard, Users, FileCheck, ClipboardList, TrendingUp, Settings, MessageSquare, Briefcase } from 'lucide-react';

const ManagerDashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            const res = await ProjectService.getAllProjects();
            setProjects(res.data);
            const pending = res.data.filter(p => p.status === 'REQUEST_SUBMITTED').length;
            const completed = res.data.filter(p => p.status === 'COMPLETED').length;
            setStats({ total: res.data.length, pending, completed });
        };
        fetchAll();
    }, []);

    const handleApprove = async (id) => {
        try {
            await ProjectService.updateStatus(id, 'PM_APPROVED');
            // Refresh
            const res = await ProjectService.getAllProjects();
            setProjects(res.data);
        } catch (err) {
            console.error("Approval failed");
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Project Manager Hub</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage consultancy requests and coordinate work across teams.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Total Projects', value: stats.total, color: 'bg-primary' },
                        { label: 'Pending Approval', value: stats.pending, color: 'bg-amber-500' },
                        { label: 'Completed', value: stats.completed, color: 'bg-secondary' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-1">{s.label}</p>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">{s.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${s.color} rounded-2xl`}></div>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Requests</h3>
                        <button className="text-primary font-bold hover:underline flex items-center gap-2">View All <TrendingUp size={18} /></button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Requested On</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-primary">
                                                    {project.client.username[0].toUpperCase()}
                                                </div>
                                                <div className="font-bold text-slate-900 dark:text-white">{project.client.username}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-slate-500 dark:text-slate-400">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.status === 'REQUEST_SUBMITTED' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {project.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {project.status === 'REQUEST_SUBMITTED' ? (
                                                <button
                                                    onClick={() => handleApprove(project.id)}
                                                    className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all shadow-md"
                                                >
                                                    Approve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedProject(project)}
                                                    className="px-4 py-2 bg-secondary text-white rounded-lg font-bold hover:bg-secondary-dark transition-all shadow-md"
                                                >
                                                    Assign Team
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedProject && (
                <AssignmentModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    onAssignSuccess={() => {
                        window.location.reload();
                    }}
                />
            )}
        </div>
    );
};

export default ManagerDashboard;
