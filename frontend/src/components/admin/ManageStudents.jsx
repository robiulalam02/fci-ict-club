import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Trash2, Loader2, UserCheck, Edit3, Briefcase } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

// Import Modular Components
import EditStudentModal from '../modals/EditStudentModal';
import FilterStudentPopover from '../modals/FilterStudentPopover';

const ManageStudents = () => {
    const axiosSecure = useAxiosSecure();

    const [searchTerm, setSearchTerm] = useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filters, setFilters] = useState({ department: '', course: '', status: '' });

    const resetFilters = () => setFilters({ department: '', course: '', status: '' });

    const { data: students = [], isLoading, isFetching, refetch } = useQuery({
        queryKey: ['admin-students', searchTerm, filters],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/admin/students', {
                params: {
                    search: searchTerm,
                    department: filters.department,
                    course: filters.course,
                    status: filters.status
                }
            });
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Student will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete",
            customClass: { popup: 'rounded-[32px]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/api/admin/students/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Removed successfully");
                        refetch();
                    }
                } catch (error) {
                    toast.error("Deletion failed");
                }
            }
        });
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Student Directory</h1>
                    <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                        Total registered: {students.length} members
                        {isFetching && <Loader2 size={14} className="animate-spin text-blue-600" />}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Name or Roll..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none w-full md:w-64 transition-all font-medium text-slate-700"
                        />
                    </div>

                    <FilterStudentPopover
                        filters={filters}
                        setFilters={setFilters}
                        resetFilters={resetFilters}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/40 relative">
                {/* Visual feedback using Tailwind pulse instead of custom keyframes */}
                {isFetching && !isLoading && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-100 overflow-hidden">
                        <div className="w-full h-full bg-blue-600 animate-pulse" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                                <th className="px-8 py-6">Profile</th>
                                <th className="px-6 py-6">Academic</th>
                                <th className="px-6 py-6">Course</th>
                                <th className="px-6 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-32 text-center text-slate-400 font-black uppercase text-xs tracking-[4px]">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-blue-600" size={32} />
                                            <span>Querying database...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={student.profilePhoto} className="w-12 h-12 rounded-2xl object-cover bg-slate-50 ring-2 ring-slate-50" alt="" />
                                                <div>
                                                    <p className="font-bold text-slate-800">{student.name}</p>
                                                    <p className="text-xs text-slate-400 font-bold tracking-tight">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-700">{student.department}</p>
                                            <p className="text-xs text-slate-400 font-medium">Roll: {student.boardRoll}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-blue-600 font-bold text-[11px] bg-blue-50 px-4 py-2 rounded-xl w-fit border border-blue-100/50">
                                                <Briefcase size={14} /> {student.course || "General"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${student.status === "verified" ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                <UserCheck size={12} /> {student.status || "pending"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => handleEditClick(student)} className="p-2.5 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                                                <button onClick={() => handleDelete(student._id)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-32 text-center text-slate-400 font-black uppercase text-xs tracking-[4px]">No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <EditStudentModal
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                student={selectedStudent}
                refetch={refetch}
            />
        </div>
    );
};

export default ManageStudents;