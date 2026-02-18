import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import {
    LayoutDashboard,
    FilePlus,
    Menu,
    X,
    LogOut,
    ShieldCheck,
    Megaphone,
    Users,
    GraduationCap,
    Home // Import Home Icon
} from 'lucide-react';
import Logo from '../assets/logo.png';
import { AuthContext } from '../Providers/AuthProvider';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, logOut } = useContext(AuthContext);

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/manage-students', name: 'Manage Students', icon: <Users size={20} /> },
        { path: '/admin/manage-mentors', name: 'Manage Mentors', icon: <GraduationCap size={20} /> },
        { path: '/admin/add-certificate', name: 'Add Certificate', icon: <FilePlus size={20} /> },
        { path: '/admin/manage-notice', name: 'Manage Notice', icon: <Megaphone size={20} /> },
    ];

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - ADMIN THEME */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#1e293b] text-white transition-transform duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static lg:inset-0 shadow-2xl lg:shadow-none flex flex-col border-r border-slate-700
            `}>
                {/* Sidebar Header */}
                <div className="p-8 flex items-center justify-between border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                            <img src={Logo} alt="Logo" className='w-8 h-8 object-contain brightness-0 invert' />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl leading-none text-white tracking-tight">ICT Club</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mt-1">Admin Panel</span>
                        </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Management</p>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative overflow-hidden
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 font-bold'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-blue-100 font-medium'}
                                `}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-300 transition-colors'}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-6 border-t border-slate-700/50 bg-slate-900/30">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-700 shadow-md">
                            AD
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{user?.displayName || 'Admin User'}</p>
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={10} className="text-green-400" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Super Admin</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {/* 1. Back to Home Button */}
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-200 text-xs font-bold uppercase tracking-wider border border-slate-700"
                        >
                            <Home size={16} /> Back to Website
                        </Link>

                        {/* 2. Logout Button */}
                        <button
                            onClick={handleLogOut}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="hidden md:block text-sm font-bold text-slate-500 uppercase tracking-widest">
                            {menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block border-r pr-4 border-slate-200 mr-2">
                            <p className="text-sm font-bold text-slate-800">System Status</p>
                            <div className="flex items-center gap-1.5 justify-end">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Online</p>
                            </div>
                        </div>
                        <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                            <ShieldCheck size={20} />
                        </div>
                    </div>
                </header>

                {/* Main Viewport */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;