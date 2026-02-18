import React, { useEffect, useState } from 'react';
import { Megaphone, Calendar, ArrowRight, Loader2, X, Info, Clock } from 'lucide-react';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const NoticeBoard = () => {
    const axiosPublic = useAxiosPublic();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosPublic.get('/api/notices');
                setNotices(res.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching notices:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, [axiosPublic]);

    const handleReadDetails = (notice) => {
        setSelectedNotice(notice);
        setIsModalOpen(true);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Left Sidebar */}
                <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004274] px-4 py-2 rounded-full w-fit border border-blue-100">
                        <Megaphone size={18} className="animate-bounce" />
                        <span className="text-xs font-black uppercase tracking-widest">Latest Updates</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 leading-tight tracking-tight">
                        Club <span className="text-blue-600 underline underline-offset-8 decoration-4 decoration-blue-100">Notices</span> & News
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Stay ahead with real-time updates on workshops, upcoming tech events, and academic resources.
                    </p>
                    <button className="flex items-center gap-2 text-[#004274] font-black hover:gap-4 transition-all group w-fit">
                        View All Archive <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Area: Dynamic Notices */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative min-h-[300px]">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

                        <div className="divide-y divide-slate-50 relative z-10">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                                    <Loader2 className="animate-spin text-blue-600" size={32} />
                                    <p className="font-bold uppercase tracking-widest text-xs">Loading Latest News...</p>
                                </div>
                            ) : notices.length > 0 ? (
                                notices.map((notice) => (
                                    <div key={notice._id} className="p-8 hover:bg-slate-50/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                        <div className="flex items-start gap-5">
                                            <div className={`mt-2 w-3 h-3 rounded-full shrink-0 animate-pulse ${notice.type === 'Urgent' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' :
                                                notice.type === 'Event' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'bg-slate-400'
                                                }`}></div>

                                            <div className="space-y-1">
                                                <h4 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer" onClick={() => handleReadDetails(notice)}>
                                                    {notice.title}
                                                </h4>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                        <Calendar size={14} /> {notice.date}
                                                    </span>
                                                    <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-widest ${notice.type === 'Urgent' ? 'bg-red-100 text-red-600' :
                                                        notice.type === 'Event' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {notice.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleReadDetails(notice)} className="w-fit px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#004274] hover:text-white transition-all shadow-sm active:scale-95">
                                            Read Details
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No active notices found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STUNNING NOTICE DETAILS MODAL --- */}
            {isModalOpen && selectedNotice && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Glass Overlay Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white w-full max-w-2xl rounded-[44px] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
                        {/* Modal Header Decoration */}
                        <div className={`h-3 w-full ${selectedNotice.type === 'Urgent' ? 'bg-red-500' :
                            selectedNotice.type === 'Event' ? 'bg-blue-600' : 'bg-slate-400'
                            }`}></div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 p-2 bg-slate-100 text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-10 md:p-14 space-y-8 relative">
                            {/* Decorative Background Icon */}
                            <Megaphone className="absolute top-10 right-10 text-slate-50 opacity-[0.03]" size={200} />

                            <div className="space-y-4 relative z-10">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedNotice.type === 'Urgent' ? 'bg-red-100 text-red-600' :
                                    selectedNotice.type === 'Event' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    <Info size={14} /> {selectedNotice.type} Notice
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                                    {selectedNotice.title}
                                </h3>
                                <div className="flex items-center gap-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
                                    <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> {selectedNotice.date}</span>
                                    <span className="flex items-center gap-2"><Clock size={16} className="text-blue-500" /> Posted recently</span>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                                    <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                                        {selectedNotice.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-[#004274] text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95"
                                >
                                    Understood
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default NoticeBoard;