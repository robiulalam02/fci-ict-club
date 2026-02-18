import React, { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { useForm } from 'react-hook-form';

import { X, User, CheckCircle2, Linkedin, Github, Facebook, Twitter, UploadCloud, Loader2 } from 'lucide-react';

import { toast } from 'sonner';

import useAxiosSecure from '../../Hooks/useAxiosSecure';

import { imageUpload } from '../../utils/imageUpload'; // Import your utility



const AddMentorModal = ({ isOpen, setIsOpen, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const [uploading, setUploading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();



    const onSubmit = async (data) => {

        const toastId = toast.loading("Processing registration...");

        setUploading(true);



        try {

            // 1. Upload Image to ImgBB

            const imageFile = data.image[0];

            let imageUrl = '';



            if (imageFile) {

                const uploadRes = await imageUpload(imageFile);

                imageUrl = uploadRes; // Assuming your utility returns the URL directly

            }



            // 2. Prepare Data for Database

            const finalData = {

                name: data.name,

                email: data.email,

                phone: data.phone,

                department: data.department,

                shift: data.shift,

                session: data.session,

                boardRoll: data.boardRoll,

                image: imageUrl,

                faculties: data.faculties || [], // Checkbox array

                linkedin: data.linkedin,

                github: data.github,

                facebook: data.facebook,

                x: data.x,

            };



            // 3. Save to MongoDB

            const res = await axiosSecure.post('/api/admin/mentors', finalData);

            if (res.data.insertedId) {

                toast.success("Mentor profile created successfully", { id: toastId });

                reset();

                refetch();

                setIsOpen(false);

            }

        } catch (error) {

            console.error(error);

            toast.error("Failed to add mentor. Check console.", { id: toastId });

        } finally {

            setUploading(false);

        }

    };



    const courseOptions = [

        "Web Design & Development",

        "Computer Programming",

        "Graphics Design",

        "Cyber Security & Networking",

        "Power & Circuit"

    ];



    return (

        <Transition show={isOpen} as={Fragment}>

            <Dialog as="div" className="relative z-[200]" onClose={() => setIsOpen(false)}>

                {/* Backdrop */}

                <Transition.Child

                    as={Fragment}

                    enter="ease-out duration-300"

                    enterFrom="opacity-0"

                    enterTo="opacity-100"

                    leave="ease-in duration-200"

                    leaveFrom="opacity-100"

                    leaveTo="opacity-0"

                >

                    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" />

                </Transition.Child>



                {/* Modal Position Wrapper */}

                <div className="fixed inset-0 overflow-y-auto">

                    <div className="flex min-h-full items-center justify-center p-4 text-center">

                        <Transition.Child

                            as={Fragment}

                            enter="ease-out duration-300"

                            enterFrom="opacity-0 scale-95 translate-y-4"

                            enterTo="opacity-100 scale-100 translate-y-0"

                            leave="ease-in duration-200"

                            leaveFrom="opacity-100 scale-100 translate-y-0"

                            leaveTo="opacity-0 scale-95 translate-y-4"

                        >

                            {/* Modal Panel - Scrollable Logic Added */}

                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-[32px] bg-white p-6 md:p-8 text-left align-middle shadow-xl transition-all border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">



                                {/* Header */}

                                <div className="flex justify-between items-center mb-6 bg-white z-10 pb-2 border-b border-slate-50">

                                    <Dialog.Title className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">

                                        <User size={20} className="text-blue-600" /> New Faculty Mentor

                                    </Dialog.Title>

                                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">

                                        <X size={20} />

                                    </button>

                                </div>



                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                    {/* Basic Info */}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>

                                            <input {...register("name", { required: true })} placeholder="Md. Rahim Uddin" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all" />

                                        </div>

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>

                                            <input {...register("email", { required: true })} type="email" placeholder="mentor@fci.edu.bd" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all" />

                                        </div>

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>

                                            <input {...register("phone", { required: true })} placeholder="+8801..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all" />

                                        </div>



                                        {/* Image Upload Input */}

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Photo</label>

                                            <div className="relative">

                                                <input

                                                    {...register("image", { required: true })}

                                                    type="file"

                                                    accept="image/*"

                                                    className="w-full px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-slate-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"

                                                />

                                                <UploadCloud className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />

                                            </div>

                                        </div>

                                    </div>



                                    {/* Academic Info */}

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dept</label>

                                            <select {...register("department", { required: true })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-100">

                                                <option value="">Select</option>

                                                <option value="CST">CST</option>

                                                <option value="TCT">TCT</option>

                                            </select>

                                        </div>

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shift</label>

                                            <select {...register("shift", { required: true })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-100">

                                                <option value="">Select</option>

                                                <option value="1st">1st Shift</option>

                                                <option value="2nd">2nd Shift</option>

                                            </select>

                                        </div>

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session</label>

                                            <input {...register("session", { required: true })} placeholder="2020-21" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />

                                        </div>

                                        <div className="space-y-1">

                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Roll</label>

                                            <input {...register("boardRoll", { required: true })} placeholder="502..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-blue-100" />

                                        </div>

                                    </div>



                                    {/* Faculty Selection */}

                                    <div className="space-y-2">

                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Faculty / Courses</label>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">

                                            {courseOptions.map((course, idx) => (

                                                <label key={idx} className="flex items-center gap-3 cursor-pointer group hover:bg-white p-2 rounded-lg transition-all">

                                                    <input

                                                        type="checkbox"

                                                        value={course}

                                                        {...register("faculties")}

                                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"

                                                    />

                                                    <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{course}</span>

                                                </label>

                                            ))}

                                        </div>

                                    </div>



                                    {/* Social Links */}

                                    <div className="space-y-1">

                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Social Connections</label>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            <div className="relative">

                                                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                                <input {...register("linkedin")} placeholder="LinkedIn URL" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm focus:ring-2 focus:ring-blue-100" />

                                            </div>

                                            <div className="relative">

                                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                                <input {...register("github")} placeholder="GitHub URL" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm focus:ring-2 focus:ring-blue-100" />

                                            </div>

                                            <div className="relative">

                                                <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                                <input {...register("facebook")} placeholder="Facebook URL" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm focus:ring-2 focus:ring-blue-100" />

                                            </div>

                                            <div className="relative">

                                                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                                <input {...register("x")} placeholder="X (Twitter) URL" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm focus:ring-2 focus:ring-blue-100" />

                                            </div>

                                        </div>

                                    </div>



                                    <button

                                        type="submit"

                                        disabled={uploading}

                                        className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"

                                    >

                                        {uploading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={18} />}

                                        {uploading ? "Uploading & Saving..." : "Confirm Registration"}

                                    </button>

                                </form>

                            </Dialog.Panel>

                        </Transition.Child>

                    </div>

                </div>

            </Dialog>

        </Transition>

    );

};



export default AddMentorModal;