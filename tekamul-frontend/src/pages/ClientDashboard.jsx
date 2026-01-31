import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProjectRequestForm from '../components/ProjectRequestForm';
import ProjectService from '../services/project.service';
import ChatWindow from '../components/ChatWindow';
import AIGuide from '../components/AIGuide';
import { LayoutDashboard, FilePlus, MessageSquare, Bell, Settings, Stars, Download, BrainCircuit } from 'lucide-react';

const ClientDashboard = () => {
    const { user } = useAuth();
    const { t, lang, switchLang } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [chatPartner, setChatPartner] = useState(null);

    // Calculate project progress based on the most recent project's status
    const projectProgress = React.useMemo(() => {
        if (!projects || projects.length === 0) return 0;
        // Assuming the first project is the most relevant/recent one
        const currentProject = projects[0];

        const statusMap = {
            'SUBMITTED': 10,
            'PENDING': 15,
            'REVIEWING': 25,
            'APPROVED': 40,
            'IN_PROGRESS': 65,
            'COMPLETED': 100
        };

        return statusMap[currentProject.status] || 5;
    }, [projects]);

    const fetchProjects = async () => {
        try {
            const data = await ProjectService.getMyProjects();
            setProjects(data.data);
        } catch (err) {
            console.error("Failed to fetch projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Header / Sub-nav */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {t('welcome')}, {user?.fullName}!
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">Track and manage your architectural projects effortlessly.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => switchLang(lang === 'en' ? 'am' : 'en')}
                            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary transition-colors"
                        >
                            {lang === 'en' ? 'Amharic (አማርኛ)' : 'English'}
                        </button>
                        <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        {[
                            { id: 'overview', icon: <LayoutDashboard size={20} />, label: t('dashboard') },
                            { id: 'request', icon: <FilePlus size={20} />, label: t('projectRequest') },
                            { id: 'chat', icon: <MessageSquare size={20} />, label: t('chat') },
                            { id: 'ai', icon: <BrainCircuit size={20} />, label: t('aiGuide') },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-3xl text-white shadow-xl">
                                        <h4 className="text-xl font-bold mb-2">Ongoing Projects</h4>
                                        <p className="text-4xl font-black">{projects.length}</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-lg">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Project Progress</h4>
                                        <div className="flex items-end gap-2 mb-2">
                                            <span className="text-4xl font-black text-primary">{projectProgress}%</span>
                                            <span className="text-sm text-slate-500 mb-1">completed</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary h-full transition-all duration-1000 ease-out"
                                                style={{ width: `${projectProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                    <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">Active Status</h4>
                                    </div>
                                    <div className="p-8">
                                        {projects.length === 0 ? (
                                            <div className="text-center py-12">
                                                <p className="text-slate-500 mb-6">You haven't submitted any projects yet.</p>
                                                <button
                                                    onClick={() => setActiveTab('request')}
                                                    className="px-6 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-dark transition-all"
                                                >
                                                    Start First Project
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {projects.map((project) => (
                                                    <div key={project.id} className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl flex justify-between items-center group hover:border-primary transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                                <FilePlus size={24} />
                                                            </div>
                                                            <div>
                                                                <h5 className="font-bold text-slate-900 dark:text-white">Project #{project.id}</h5>
                                                                <p className="text-sm text-slate-500">{new Date(project.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                                            {project.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'request' && (
                            <div className="animate-in slide-in-from-right-8 duration-500">
                                <ProjectRequestForm onUploadSuccess={() => { setActiveTab('overview'); fetchProjects(); }} />
                            </div>
                        )}

                        {activeTab === 'ai' && (
                            <AIGuide />
                        )}

                        {activeTab === 'chat' && (
                            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-500">
                                <MessageSquare className="mx-auto mb-6 text-primary" size={64} />
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Consult with our Team</h3>
                                <p className="text-slate-500 mb-8 max-w-sm mx-auto">Click below to start a conversation with our project managers for any assistance.</p>
                                <button
                                    onClick={() => setChatPartner({ id: 2, name: 'Project Manager' })} // Static PM ID for now
                                    className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-xl transition-all"
                                >
                                    Start Chat Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {chatPartner && (
                <ChatWindow
                    partnerId={chatPartner.id}
                    partnerName={chatPartner.name}
                    onClose={() => setChatPartner(null)}
                />
            )}
        </div>
    );
};

export default ClientDashboard;
