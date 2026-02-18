import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    ClipboardCheck,
    Menu,
    LogOut,
    GraduationCap,
    X
} from 'lucide-react';
import { AuthContext } from '../Providers/AuthProvider';
import Logo from '../assets/logo.png'; // Make sure this path is correct

const MentorLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const menuItems = [
        {
            path: '/mentor/dashboard',
            name: 'Overview',
            icon: <LayoutDashboard size={20} />
        },
        {
            path: '/mentor/my-students',
            name: 'My Students',
            icon: <Users size={20} />
        },
        {
            path: '/mentor/resources',
            name: 'Resource Library',
            icon: <BookOpen size={20} />
        },
        {
            path: '/mentor/assignments',
            name: 'Assignments',
            icon: <ClipboardCheck size={20} />
        },
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

            {/* Sidebar - TEAL THEME */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#0f766e] text-white transition-transform duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static lg:inset-0 shadow-2xl lg:shadow-none flex flex-col
            `}>
                {/* Header */}
                <div className="p-8 flex items-center justify-between border-b border-teal-800/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-lg shadow-teal-900/20">
                            <img src={Logo} alt="Logo" className='w-8 h-8 object-contain' />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl leading-none text-white tracking-tight">ICT Club</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-teal-200 font-bold mt-1">Mentor Panel</span>
                        </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-teal-200 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] font-black text-teal-200/50 uppercase tracking-widest mb-4 px-2">Main Menu</p>
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
                                        ? 'bg-white text-teal-900 shadow-xl shadow-teal-900/10 font-bold'
                                        : 'text-teal-100 hover:bg-teal-800/50 hover:text-white font-medium'}
                                `}
                            >
                                <span className={`${isActive ? 'text-teal-600' : 'text-teal-300 group-hover:text-white transition-colors'}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer User Profile */}
                <div className="p-6 border-t border-teal-800/50 bg-teal-950/30">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/40"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-teal-200 object-cover"
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{user?.displayName}</p>
                            <p className="text-[10px] text-teal-300 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogOut}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-teal-800/50 text-teal-100 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors" onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block border-r pr-4 border-slate-200 mr-2">
                            <p className="text-sm font-bold text-slate-800">Instructor Mode</p>
                            <div className="flex items-center gap-1.5 justify-end">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Active Session</p>
                            </div>
                        </div>
                        <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 border border-teal-100 shadow-sm">
                            <GraduationCap size={20} />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MentorLayout;