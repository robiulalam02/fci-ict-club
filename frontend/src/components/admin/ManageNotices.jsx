import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Megaphone, Plus, Trash2, Edit3, Calendar, Loader2, X, Save } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageNotices = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    // States for Update Modal
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    // Fetch Notices
    const { data: notices = [], isLoading } = useQuery({
        queryKey: ['notices'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/notices');
            return res.data;
        }
    });

    // Handle Create Notice
    const handleAddNotice = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const newNotice = {
            title: form.title.value,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            type: form.type.value,
            description: form.description.value
        };

        try {
            await axiosSecure.post('/api/notices', newNotice);
            queryClient.invalidateQueries(['notices']);
            Swal.fire({ icon: 'success', title: 'Notice Published', showConfirmButton: false, timer: 1500, customClass: { popup: 'rounded-[32px]' } });
            form.reset();
        } catch (err) {
            Swal.fire('Error', 'Failed to publish notice', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle Update Notice
    const handleUpdateNotice = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const updatedData = {
            title: form.title.value,
            type: form.type.value,
            description: form.description.value
        };

        try {
            await axiosSecure.patch(`/api/notices/${selectedNotice._id}`, updatedData);
            queryClient.invalidateQueries(['notices']);
            Swal.fire({ icon: 'success', title: 'Notice Updated', showConfirmButton: false, timer: 1500, customClass: { popup: 'rounded-[32px]' } });
            setIsUpdateModalOpen(false);
        } catch (err) {
            Swal.fire('Error', 'Update failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This notice will be removed from the homepage!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: { popup: 'rounded-[32px]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/api/notices/${id}`);
                queryClient.invalidateQueries(['notices']);
                Swal.fire("Deleted!", "Notice has been removed.", "success");
            }
        });
    };

    const openUpdateModal = (notice) => {
        setSelectedNotice(notice);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10 min-h-screen">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Manage <span className="text-blue-600">Notice Board</span></h2>
                    <p className="text-slate-500 font-medium">Add, edit, or remove club announcements.</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 flex items-center gap-3">
                    <Megaphone className="text-blue-600 animate-pulse" size={20} />
                    <span className="text-sm font-bold text-blue-700">{notices.length} Active Notices</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- ADD NEW NOTICE FORM --- */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleAddNotice} className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 sticky top-24">
                        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                            <Plus className="text-blue-600" size={20} /> New Announcement
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Title</label>
                                <input name="title" required className="w-full mt-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Workshop Registration" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                <select name="type" className="w-full mt-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                                    <option value="Update">General Update</option>
                                    <option value="Urgent">Urgent / Alert</option>
                                    <option value="Event">Upcoming Event</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea name="description" rows="3" className="w-full mt-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Details of the notice..."></textarea>
                            </div>
                            <button disabled={loading} className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? <Loader2 className="animate-spin" /> : <Plus size={18} />}
                                Publish Notice
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- NOTICE LIST TABLE --- */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Notice Details</th>
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {isLoading ? (
                                    <tr><td colSpan="3" className="p-10 text-center text-slate-400 font-bold">Loading notices...</td></tr>
                                ) : notices.length === 0 ? (
                                    <tr><td colSpan="3" className="p-10 text-center text-slate-400 font-bold text-sm">No notices posted yet.</td></tr>
                                ) : notices.map((notice) => (
                                    <tr key={notice._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5">
                                            <p className="font-bold text-slate-800 line-clamp-1">{notice.title}</p>
                                            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                                <Calendar size={12} /> {notice.date}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${notice.type === 'Urgent' ? 'bg-red-100 text-red-600' :
                                                notice.type === 'Event' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {notice.type}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openUpdateModal(notice)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                                                <button onClick={() => handleDelete(notice._id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- UPDATE MODAL --- */}
            {isUpdateModalOpen && selectedNotice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsUpdateModalOpen(false)}></div>

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100 animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setIsUpdateModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors">
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Edit <span className="text-blue-600">Notice</span></h3>
                            <p className="text-slate-400 text-sm font-medium mt-1">Modify the announcement details below.</p>
                        </div>

                        <form onSubmit={handleUpdateNotice} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                    <input name="title" defaultValue={selectedNotice.title} required className="w-full mt-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                    <select name="type" defaultValue={selectedNotice.type} className="w-full mt-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                                        <option value="Update">General Update</option>
                                        <option value="Urgent">Urgent / Alert</option>
                                        <option value="Event">Upcoming Event</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description</label>
                                    <textarea name="description" defaultValue={selectedNotice.description} rows="4" className="w-full mt-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                                </div>
                            </div>

                            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                                {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNotices;