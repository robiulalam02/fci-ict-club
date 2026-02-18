import React, { useContext } from 'react';
import { Users, FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';

const MentorDashboard = () => {
    const { user } = useContext(AuthContext);

    // Static stats for visual structure (Will be dynamic later)
    const stats = [
        { title: 'My Students', value: '42', icon: <Users size={24} />, color: 'bg-blue-500', bg: 'bg-blue-50' },
        { title: 'Resources', value: '12', icon: <FileText size={24} />, color: 'bg-teal-500', bg: 'bg-teal-50' },
        { title: 'Pending Tasks', value: '5', icon: <Clock size={24} />, color: 'bg-amber-500', bg: 'bg-amber-50' },
        { title: 'Submissions', value: '128', icon: <CheckCircle size={24} />, color: 'bg-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-[#0f766e] rounded-[32px] p-8 md:p-12 text-white shadow-xl shadow-teal-900/10 relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-wider text-teal-100">
                        <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse"></span>
                        Faculty Dashboard
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Welcome back, {user?.displayName?.split(' ')[0] || 'Mentor'}!</h1>
                    <p className="text-teal-100 font-medium max-w-lg text-lg leading-relaxed">
                        You have <span className="text-white font-bold border-b border-teal-400">5 new assignments</span> to review. Your students are waiting for your feedback.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                {/* Pattern */}
                <svg className="absolute right-0 bottom-0 h-full w-1/3 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.color} p-3.5 rounded-2xl text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div className={`${stat.bg} px-2.5 py-1 rounded-lg`}>
                                <ArrowRight size={14} className={`${stat.color.replace('bg-', 'text-')} opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0`} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Split: Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Recent Activity</h2>
                        <button className="text-teal-600 text-xs font-bold uppercase tracking-widest hover:text-teal-800">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-5 items-start pb-6 border-b border-slate-50 last:border-0 last:pb-0 hover:bg-slate-50/50 p-2 rounded-2xl transition-colors">
                                <div className="mt-1 relative">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold">
                                        JS
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">New Resource Uploaded</p>
                                    <p className="text-sm text-slate-500 mt-0.5">You added "JavaScript ES6 Features.pdf" to Web Development</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions (Sidebar Widget) */}
                <div className="bg-teal-900 rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                        <h2 className="text-xl font-black tracking-tight mb-2">Quick Upload</h2>
                        <p className="text-teal-200 text-sm mb-6">Share a new learning resource instantly with your students.</p>

                        <button className="w-full bg-white text-teal-900 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                            <FileText size={18} /> Upload Resource
                        </button>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-800 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;