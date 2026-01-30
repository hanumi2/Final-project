import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    Users,
    Layout,
    Send,
    UserCheck,
    PenTool,
    Download,
    Shield,
    Zap,
    Star,
    Lock,
    User,
    Settings,
    MessageSquare,
    ClipboardList,
    HardHat,
    Droplets,
    Truck,
    Building2
} from 'lucide-react';

const LandingPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const steps = [
        {
            title: "Request",
            desc: "Client submits project request.",
            icon: <Send className="text-primary" size={32} />
        },
        {
            title: "Assign",
            desc: "System assigns to specialized engineers.",
            icon: <UserCheck className="text-primary" size={32} />
        },
        {
            title: "Design",
            desc: "Engineers create blueprints.",
            icon: <PenTool className="text-primary" size={32} />
        },
        {
            title: "Deliver",
            desc: "Final blueprints delivered.",
            icon: <Download className="text-primary" size={32} />
        }
    ];

    const features = [
        { name: "Project Optimization", desc: "Automated workflow orchestration for engineering tasks.", icon: <Star className="text-primary" size={24} /> },
        { name: "Real-time Collaboration", desc: "Connect architects and engineers in one unified interface.", icon: <Users className="text-primary" size={24} /> },
        { name: "Secure Storage", desc: "Enterprise-grade security for all project documentation.", icon: <Shield className="text-primary" size={24} /> },
        { name: "Automated Delivery", desc: "Accelerate phase transitions with intelligent task routing.", icon: <Zap className="text-primary" size={24} /> },
        { name: "Design Integrity", desc: "Maintain high architectural standards with automated checks.", icon: <Building2 className="text-primary" size={24} /> },
        { name: "Client Insights", desc: "Real-time visibility into project status for property owners.", icon: <Layout className="text-primary" size={24} /> }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans selection:bg-primary selection:text-white">

            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-bg.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Typography */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                                Track Construction Projects <br />
                                <span className="text-primary-light">from Start to Final Approval</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
                                Tekamul Progress Tracking System converts client requests into finalized blueprints through a seamless collaborative workflow. Delivering architectural, electrical, and hydraulic plans with precision and efficiency.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link
                                    to="/register"
                                    className="px-8 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-base hover:bg-slate-100 transition-all flex items-center justify-center"
                                >
                                    Start Project
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="px-8 py-3.5 bg-transparent text-white border border-white/30 rounded-xl font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center"
                                >
                                    See How It Works
                                </a>
                            </div>

                            <div className="flex items-center gap-6 text-slate-400 text-xs font-medium border-t border-white/10 pt-8 mt-2">
                                <div className="flex items-center gap-2"><Shield size={14} className="text-primary-light" /> Privacy-first</div>
                                <div className="flex items-center gap-2"><Zap size={14} className="text-primary-light" /> Real-time Tracking</div>
                                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-primary-light" /> Secure Platform</div>
                            </div>
                        </motion.div>

                        {/* Right Column: Floating Asset */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="relative p-2 bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                                <img
                                    src="/hero-card-img.png"
                                    alt="3D Model"
                                    className="rounded-[2rem] w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white text-xs font-bold uppercase tracking-widest">Real-time Demo</div>
                                            <div className="text-slate-400 text-[10px]">Processing Phase 04...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. How It Works Section */}
            <section id="how-it-works" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <motion.div {...fadeIn}>
                            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">The Process</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">HOW IT WORKS</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                                A Structured Pipeline for Engineering Projects
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0"></div>

                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="relative z-10 group"
                            >
                                <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 text-center">
                                    <div className="mb-8 w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-500 mx-auto group-hover:rotate-6">
                                        <span className="group-hover:text-white transition-colors">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{step.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </div>
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-900 rounded-full border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Features Section */}
            <section id="features" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <motion.div {...fadeIn}>
                            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Features</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Powerful Visualization for Construction</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-normal max-w-2xl mx-auto">
                                Our automated pipeline connects multiple expertise models to deliver accurate project conversions.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary/5 group-hover:scale-110 transition-all">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                                    {feature.name}
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary z-0">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <motion.div {...fadeIn}>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight uppercase">
                            Ready to streamline your <br /> project workflow?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                to="/register"
                                className="px-12 py-6 bg-white text-primary rounded-2xl font-black text-xl hover:bg-slate-50 transition-all transform hover:scale-105 shadow-2xl"
                            >
                                Get Started
                            </Link>
                            <button
                                className="px-12 py-6 bg-primary-dark text-white border border-white/20 rounded-2xl font-black text-xl hover:bg-primary-dark/80 transition-all transform hover:scale-105"
                            >
                                Schedule a Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer refinement */}
            <footer className="bg-slate-950 text-white py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-12 gap-16 mb-20">
                        <div className="md:col-span-5">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#10b981] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    <img src="/logo.png" alt="T" className="w-8 h-8 object-contain" onError={(e) => e.target.style.display = 'none'} />
                                    <span className="group-hover:hidden">T</span>
                                </div>
                                <span className="text-3xl font-black tracking-tighter">Tekamul</span>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium mb-10">
                                Revolutionizing construction consultancy through digital precision and automated workflow orchestration. The ultimate hub for engineers and property owners.
                            </p>
                            <div className="flex gap-6">
                                {['facebook', 'instagram', 'linkedin', 'twitter'].map((social) => (
                                    <a key={social} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#2563eb] transition-all duration-300">
                                        <div className="capitalize font-black text-[10px]">{social[0]}</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2 md:col-start-7">
                            <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8">Platform</h5>
                            <ul className="space-y-4 font-bold text-slate-300">
                                <li><a href="#" className="hover:text-[#2563eb] transition-colors">Case Studies</a></li>
                                <li><a href="#" className="hover:text-[#2563eb] transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-[#2563eb] transition-colors">Security</a></li>
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8">System</h5>
                            <ul className="space-y-4 font-bold text-slate-300">
                                <li><Link to="/login" className="hover:text-[#2563eb] transition-colors">Engineers Login</Link></li>
                                <li><Link to="/register" className="hover:text-[#2563eb] transition-colors">Client Onboarding</Link></li>
                                <li><a href="#" className="hover:text-[#2563eb] transition-colors">Support Center</a></li>
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8">Contact</h5>
                            <ul className="space-y-4 font-bold text-slate-300">
                                <li><a href="mailto:info@tekamul.com" className="hover:text-[#10b981] transition-colors">info@tekamul.com</a></li>
                                <li className="text-slate-500 text-sm">Main Office, City Tower 12<br />London, UK</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 font-bold text-sm">
                        <p>© 2026 TAKAMUL PROJECT TRACKING SYSTEM.</p>
                        <div className="flex gap-8 capitalize">
                            <a href="#" className="hover:text-white transition-colors">privacy policy</a>
                            <a href="#" className="hover:text-white transition-colors">terms of service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
