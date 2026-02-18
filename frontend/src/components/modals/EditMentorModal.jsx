import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { X, User, CheckCircle2, Linkedin, Github, Facebook, Twitter, UploadCloud, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { imageUpload } from '../../utils/imageUpload';

const EditMentorModal = ({ isOpen, setIsOpen, mentor: initialMentorData, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);

    // 1. FETCH FRESH DATA
    // We use the ID from the prop to fetch the latest data from the server
    const { data: mentorData, isLoading: isFetchingData } = useQuery({
        queryKey: ['mentor', initialMentorData?._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/admin/mentors/${initialMentorData._id}`);
            return res.data;
        },
        enabled: !!initialMentorData?._id && isOpen, // Only fetch when modal is open and ID exists
    });

    // 2. REACT HOOK FORM WITH 'VALUES'
    // 'values' automatically updates the form when mentorData changes (No useEffect needed)
    const { register, handleSubmit, formState: { errors } } = useForm({
        values: mentorData || {}, // Binds the fetched data to inputs
        resetOptions: {
            keepDirtyValues: true // strict behavior for editing forms
        }
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading("Updating mentor profile...");
        setUploading(true);

        try {
            let imageUrl = mentorData.image; // Keep existing image by default

            // 3. SMART IMAGE UPLOAD LOGIC
            // Check if user selected a NEW file (FileList with length > 0)
            if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
                const uploadRes = await imageUpload(data.image[0]);
                imageUrl = uploadRes;
            }

            const finalData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                department: data.department,
                shift: data.shift,
                session: data.session,
                boardRoll: data.boardRoll,
                image: imageUrl, // New or Old URL
                faculties: data.faculties || [],
                linkedin: data.linkedin,
                github: data.github,
                facebook: data.facebook,
                x: data.x,
            };

            const res = await axiosSecure.patch(`/api/admin/mentors/${mentorData._id}`, finalData);
            
            if (res.data.modifiedCount > 0) {
                toast.success("Profile updated successfully", { id: toastId });
                refetch(); // Refetch the main list
                setIsOpen(false);
            } else {
                toast.info("No changes were made", { id: toastId });
                setIsOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update mentor", { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    const courseOptions = [
        "Web Design & Development",
        "Computer Programming",
        "Graphics Design",
        "Cyber Security & Networking",
        "Hardware & IoT"
    ];

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[200]" onClose={() => setIsOpen(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-2xl bg-white rounded-[40px] p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                                
                                {/* Loading Skeleton if data is fetching */}
                                {isFetchingData ? (
                                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                        <Loader2 className="animate-spin text-blue-600" size={40} />
                                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Loading latest data...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-6 bg-white z-10 pb-2 border-b border-slate-50">
                                            <Dialog.Title className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                                                <User size={20} className="text-blue-600" /> Edit Details
                                            </Dialog.Title>
                                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><X size={20} /></button>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                            {/* Basic Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                    <input {...register("name")} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                                    <input {...register("email")} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                                                    <input {...register("phone")} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />
                                                </div>
                                                
                                                {/* Image Update Section */}
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Update Photo</label>
                                                    <div className="flex items-center gap-3">
                                                        {/* Preview existing image */}
                                                        {mentorData?.image && (
                                                            <img src={mentorData.image} alt="current" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                                                        )}
                                                        <div className="relative flex-1">
                                                            <input {...register("image")} type="file" accept="image/*" className="w-full px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-slate-500 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all" />
                                                            <UploadCloud className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Academic Info */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dept</label>
                                                    <select {...register("department")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 outline-none">
                                                        <option value="CST">CST</option>
                                                        <option value="TCT">TCT</option>
                                                        <option value="DNT">DNT</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shift</label>
                                                    <select {...register("shift")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 outline-none">
                                                        <option value="1st">1st Shift</option>
                                                        <option value="2nd">2nd Shift</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session</label>
                                                    <input {...register("session")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Roll</label>
                                                    <input {...register("boardRoll")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm" />
                                                </div>
                                            </div>

                                            {/* Faculty Selection */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Faculty / Courses</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                    {courseOptions.map((course, idx) => (
                                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group hover:bg-white p-2 rounded-lg transition-all">
                                                            <input type="checkbox" value={course} {...register("faculties")} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                                            <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{course}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Social Links */}
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Social Connections</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input {...register("linkedin")} placeholder="LinkedIn URL" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm" />
                                                    <input {...register("github")} placeholder="GitHub URL" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm" />
                                                    <input {...register("facebook")} placeholder="Facebook URL" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm" />
                                                    <input {...register("x")} placeholder="X (Twitter) URL" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm" />
                                                </div>
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={uploading}
                                                className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {uploading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={18} />}
                                                {uploading ? "Updating Profile..." : "Save Changes"}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditMentorModal;