import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationTray from './NotificationTray';
import { Sun, Moon, LogOut, Menu, X, Bell } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showNotifs, setShowNotifs] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 font-sans border-b border-transparent ${scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm'
            : 'bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                                <img src="/logo.png" alt="T" className="w-6 h-6 object-contain" onError={(e) => e.target.style.display = 'none'} />
                                <span className="group-hover:hidden text-sm font-black">T</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Tekamul <span className="text-primary/70 font-medium">Progress</span>
                            </span>
                        </Link>
                    </div>

                    {/* Centered Navigation Links */}
                    <div className="hidden lg:flex items-center justify-center gap-8 flex-1 px-8">
                        {['Features', 'How It Works', 'Pricing', 'Team', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`p-2 rounded-full transition-all duration-300 ${scrolled
                                ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                                : 'hover:bg-white/10 text-white/80 hover:text-white'
                                }`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowNotifs(!showNotifs)}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
                            </button>
                            {showNotifs && <NotificationTray onClose={() => setShowNotifs(false)} />}
                        </div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to={`/${user.role.toLowerCase()}/dashboard`}
                                    className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2"
                                >
                                    <LogOut size={16} className="rotate-180" /> Log in
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 dark:text-slate-300"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {user ? (
                        <>
                            <Link
                                to={`/${user.role.toLowerCase()}/dashboard`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-slate-600 dark:text-slate-300 font-medium"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="w-full text-left flex items-center gap-2 text-red-600 font-medium"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-slate-600 dark:text-slate-300 font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-center py-2 rounded-lg bg-primary text-white font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
