import React, { useContext, useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router';
import {
    User, LayoutDashboard, Award, Settings,
    LogOut, Menu, X, Bell, Search, ChevronRight,
    Home, Globe, Sparkles, Command
} from 'lucide-react';
import { AuthContext } from '../Providers/AuthProvider';
import LogoHome from '../components/LogoHome';

const UserDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate('/login');
    };

    const navItems = [
        { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'My Certificates', path: '/dashboard/certificates', icon: <Award size={18} /> },
        { name: 'Profile Settings', path: '/dashboard/profile', icon: <Settings size={18} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar: Fixed & Non-Scrolling */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#004274] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shrink-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header: Club Identity */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <LogoHome />
                        </div>
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation: Takes up center space */}
                    <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
                        <p className="px-4 mb-4 text-[10px] font-bold text-white/40 uppercase tracking-[2px]">Main Menu</p>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                                    ${isActive
                                        ? 'bg-white/10 text-white border border-white/10'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="text-sm font-semibold">{item.name}</span>
                                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-40" />
                            </NavLink>
                        ))}
                    </nav>

                    {/* Sidebar Bottom: Back to Website */}
                    <div className="p-4 border-t border-white/10">
                        <Link
                            to="/"
                            className="flex items-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl transition-all text-sm font-medium border border-white/5"
                        >
                            <Home size={18} />
                            Return to Home
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area: Fixed Header + Scrollable Body */}
            <div className="flex-1 flex flex-col min-w-0 h-screen relative">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
                    {/* Left: Mobile Menu + Professional Search Bar */}
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>

                        {/* Modern Search Input */}
                        <div className="flex items-center max-w-xs w-full relative group">
                            <Search className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search in dashboard"
                                className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Right: Actions + User Profile */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:animate-ping"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-200"></div>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 group"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-800 leading-none">{user?.displayName?.split(' ')[0]}</p>
                                    <p className="text-[10px] text-green-500 uppercase tracking-widest mt-1">Active Now</p>
                                </div>
                                <img
                                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-blue-100 group-hover:ring-blue-500 transition-all"
                                    alt="User"
                                />
                            </button>

                            {/* Dropdown Menu (Shadcn-style logic) */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                                        <div className="px-6 py-3 border-b border-slate-50 mb-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                                        </div>
                                        <div className="px-2">
                                            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                                                <User size={16} /> View Profile
                                            </button>
                                            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                                                <Settings size={16} /> Account Settings
                                            </button>
                                            <div className="h-px bg-slate-50 my-2"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content: Independent Scroll Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
                    <div className="max-w-6xl mx-auto p-6 lg:p-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;