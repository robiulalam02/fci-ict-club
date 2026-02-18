import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit3, Trash2, Mail, ExternalLink, Loader2, Linkedin, Github, Facebook, Twitter, Phone } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AddMentorModal from '../modals/AddMentorModal';
import EditMentorModal from '../modals/EditMentorModal'; // Import Edit Modal
import Swal from 'sweetalert2';
import { toast } from 'sonner';

const ManageMentors = () => {
    const axiosSecure = useAxiosSecure();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Edit State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);

    const { data: mentors = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-mentors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/mentors');
            return res.data;
        }
    });

    const handleEditClick = (mentor) => {
        setSelectedMentor(mentor);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Remove Mentor?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, Remove",
            customClass: { popup: 'rounded-[32px]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/api/admin/mentors/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Mentor removed");
                        refetch();
                    }
                } catch (err) {
                    toast.error("Failed to delete");
                }
            }
        });
    };

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Expert Mentors</h1>
                    <p className="text-slate-500 text-sm font-medium">Control the faculty and instructor list</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-[#004274] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95"
                >
                    <Plus size={18} /> Add New Mentor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                    <div key={mentor._id} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden flex flex-col h-full">
                        {/* Edit/Delete Overlay */}
                        <div className="absolute top-0 right-0 p-4 flex gap-2 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 z-10">
                            <button
                                onClick={() => handleEditClick(mentor)}
                                className="p-2 bg-white shadow-lg rounded-xl text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                <Edit3 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(mentor._id)}
                                className="p-2 bg-white shadow-lg rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {/* Profile Header */}
                        <div className="flex flex-col items-center text-center space-y-4 mb-4">
                            <div className="relative">
                                <img
                                    src={mentor.image || 'https://via.placeholder.com/150'}
                                    className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-50 shadow-md"
                                    alt={mentor.name}
                                />
                                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl border-4 border-white">
                                    <ExternalLink size={12} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">{mentor.name}</h3>
                                <p className="text-blue-600 text-[10px] font-black uppercase tracking-[2px] mt-1">{mentor.department} • {mentor.session}</p>
                                <p className="text-slate-400 text-[10px] font-bold mt-1">Roll: {mentor.boardRoll} ({mentor.shift} Shift)</p>
                            </div>
                        </div>

                        {/* Specialties Tag Cloud */}
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {mentor.faculties && mentor.faculties.map((fac, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-wide">
                                    {fac}
                                </span>
                            ))}
                        </div>

                        {/* Social & Contact Footer */}
                        <div className="mt-auto w-full pt-4 border-t border-slate-50 flex items-center justify-center gap-3">
                            <a href={`mailto:${mentor.email}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Email"><Mail size={18} /></a>
                            <a href={`tel:${mentor.phone}`} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Call"><Phone size={18} /></a>

                            <div className="w-px h-4 bg-slate-200 mx-1"></div>

                            {mentor.linkedin && <a href={mentor.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-blue-700 transition-colors"><Linkedin size={18} /></a>}
                            {mentor.github && <a href={mentor.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-black transition-colors"><Github size={18} /></a>}
                            {mentor.facebook && <a href={mentor.facebook} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Facebook size={18} /></a>}
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODALS --- */}
            <AddMentorModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
                refetch={refetch}
            />

            <EditMentorModal
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                mentor={selectedMentor}
                refetch={refetch}
            />
        </div>
    );
};

export default ManageMentors;