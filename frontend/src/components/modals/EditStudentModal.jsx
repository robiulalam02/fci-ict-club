import React, { useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, User, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const EditStudentModal = ({ isOpen, setIsOpen, student, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (student) {
            reset({
                name: student.name,
                department: student.department,
                course: student.course,
                status: student.status || 'pending'
            });
        }
    }, [student, reset]);

    const onSubmit = async (data) => {
        const toastId = toast.loading("Saving updates...");
        try {
            const res = await axiosSecure.patch(`/user/${student._id}`, data);
            if (res.data.modifiedCount > 0) {
                toast.success("Profile updated", { id: toastId });
                refetch();
                setIsOpen(false);
            } else {
                toast.error("No changes made", { id: toastId });
            }
        } catch (error) {
            toast.error("Update failed", { id: toastId });
        }
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[200]" onClose={() => setIsOpen(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="w-full max-w-md bg-white rounded-[40px] p-8 shadow-2xl border border-slate-100">
                            <div className="flex justify-between items-center mb-8">
                                <Dialog.Title className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                                    <User size={20} className="text-blue-600" /> Edit Member
                                </Dialog.Title>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input {...register("name")} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dept</label>
                                        <select {...register("department")} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 outline-none">
                                            <option value="CST">CST</option>
                                            <option value="TCT">TCT</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                                        <select {...register("status")} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-blue-600 outline-none uppercase">
                                            <option value="pending">Pending</option>
                                            <option value="verified">Verified</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course</label>
                                    <input {...register("course")} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />
                                </div>
                                <button type="submit" className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95">
                                    <CheckCircle2 size={18} /> Update Student
                                </button>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditStudentModal;