import React, { useContext } from 'react';
import {
    Users,
    GraduationCap,
    FileCheck,
    Megaphone,
    ArrowUpRight,
    Activity,
    UserPlus,
    ShieldAlert
} from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    // Static stats for visual structure
    const stats = [
        {
            title: 'Total Students',
            value: '2,845',
            change: '+12% this month',
            icon: <Users size={24} />,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            trend: 'up'
        },
        {
            title: 'Active Mentors',
            value: '42',
            change: 'Full Strength',
            icon: <GraduationCap size={24} />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: 'neutral'
        },
        {
            title: 'Certificates Issued',
            value: '1,105',
            change: '+85 last week',
            icon: <FileCheck size={24} />,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            trend: 'up'
        },
        {
            title: 'Active Notices',
            value: '8',
            change: '2 expiring soon',
            icon: <Megaphone size={24} />,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            trend: 'down'
        },
    ];

    const recentActivities = [
        { id: 1, type: 'registration', user: 'Rahim Uddin', dept: 'CST', time: '10 min ago' },
        { id: 2, type: 'certificate', user: 'Sumaiya Akter', dept: 'TCT', time: '45 min ago' },
        { id: 3, type: 'alert', user: 'System', dept: 'Database Backup', time: '2 hours ago' },
        { id: 4, type: 'registration', user: 'Karimul Hassan', dept: 'DNT', time: '3 hours ago' },
    ];

    return (
        <div className="space-y-8">
            {/* --- WELCOME BANNER --- */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 to-[#1e3a8a] p-8 md:p-10 shadow-2xl shadow-blue-900/20 text-white">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-blue-100">
                            <ShieldAlert size={12} className="text-emerald-400" />
                            System Secure
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                            Admin Command Center
                        </h1>
                        <p className="text-blue-200 font-medium max-w-xl text-sm md:text-base">
                            Welcome back, <span className="text-white font-bold">{user?.displayName?.split(' ')[0]}</span>. You have <span className="text-white font-bold border-b border-blue-400/50">12 pending verifications</span> waiting for approval today.
                        </p>
                    </div>

                    {/* Quick Action Button in Banner */}
                    <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95">
                        <UserPlus size={18} /> Verify Students
                    </button>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            </div>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group cursor-default">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3.5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            {stat.trend === 'up' && (
                                <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1">
                                    <ArrowUpRight size={12} /> +12%
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium mt-2 opacity-60">{stat.change}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CONTENT SPLIT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: Recent Live Activity */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                <Activity size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Live Activity Feed</h2>
                        </div>
                        <button className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-blue-800 transition-colors">View Logs</button>
                    </div>

                    <div className="space-y-1">
                        {recentActivities.map((item) => (
                            <div key={item.id} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-sm
                                    ${item.type === 'registration' ? 'bg-blue-100 text-blue-600' :
                                        item.type === 'certificate' ? 'bg-emerald-100 text-emerald-600' :
                                            'bg-slate-100 text-slate-600'}`}>
                                    {item.user.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                                        {item.type === 'registration' ? `New Student Registration: ${item.user}` :
                                            item.type === 'certificate' ? `Certificate Issued to ${item.user}` :
                                                'System Alert: Database Backup Complete'}
                                    </p>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-wide">
                                        {item.dept} • <span className="text-slate-500">{item.time}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                        <ArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Quick System Health & Actions */}
                <div className="flex flex-col gap-6">
                    {/* Server Status Card */}
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-lg font-black tracking-tight mb-1">Server Status</h2>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Operational</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                        <span>CPU Usage</span>
                                        <span className="text-white">12%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-[12%] bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                        <span>Memory</span>
                                        <span className="text-white">45%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-[45%] bg-indigo-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Request Card */}
                    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex-1 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">12 Pending</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Student Verifications</p>
                        <button className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-95">
                            Review Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;