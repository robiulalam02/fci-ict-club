import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form'; // Recommended for professional form handling
import { Quote, Send, Camera, Loader2, Sparkles } from 'lucide-react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { imageUpload } from '../utils/imageUpload';
import Swal from 'sweetalert2';

const SubmitReview = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);
    const [previewImg, setPreviewImg] = useState(user?.photoURL || null);

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            fullName: user?.displayName || '',
            photo: user?.photoURL || ''
        }
    });

    const reviewMessage = watch("message");

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/api/reviews', data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review Submitted!',
                    text: 'Thank you for sharing your journey with us.',
                    customClass: { popup: 'rounded-[32px]' }
                });
                reset();
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await imageUpload(file);
            setValue('photo', url);
            setPreviewImg(url);
        } catch (err) {
            Swal.fire('Upload Failed', 'Could not upload image to ImgBB', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                        Share Your <span className="text-blue-600">Experience</span>
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">Inspire the next generation of FCI tech leaders.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* --- FORM SECTION --- */}
                    <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input {...register("fullName", { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Course/Faculty</label>
                                    <select {...register("faculty", { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                                        <option value="Programming">Programming</option>
                                        <option value="Web Design & Development">Web Design & Development</option>
                                        <option value="Graphics Design">Graphics Design</option>
                                        <option value="Networking">Networking</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                                    <select {...register("department", { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                                        <option value="CST">Computer Science & Technology</option>
                                        <option value="TCT">Telecommunication Technology</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Session</label>
                                        <input {...register("session", { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="2022-23" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Semester</label>
                                        <input {...register("semester", { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="5th" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Tech Journey (Review Message)</label>
                                <textarea {...register("message", { required: true, minLength: 20 })} rows="5" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="How did the club help you grow?"></textarea>
                                {errors.message && <p className="text-red-500 text-xs font-bold">Message must be at least 20 characters.</p>}
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-blue-50 rounded-3xl border border-blue-100/50">
                                <div className="relative shrink-0">
                                    <img src={previewImg || 'https://via.placeholder.com/150'} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" alt="" />
                                    <label className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-lg cursor-pointer text-blue-600 hover:scale-110 transition-transform">
                                        <Camera size={14} />
                                        <input type="file" className="hidden" onChange={handlePhotoUpload} />
                                    </label>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700 leading-tight">Review Photo</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Upload a professional clear face photo.</p>
                                </div>
                                {uploading && <Loader2 className="animate-spin ml-auto text-blue-600" />}
                            </div>

                            <button type="submit" disabled={isSubmitting || uploading} className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-[24px] shadow-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50">
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                                Submit My Review
                            </button>
                        </form>
                    </div>

                    {/* --- PREVIEW SECTION --- */}
                    <div className="lg:col-span-2 sticky top-24">
                        <div className="p-4 border-2 border-dashed border-slate-200 rounded-[44px]">
                            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-4">Live Preview</p>
                            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-blue-50 flex flex-col h-full transform transition-all duration-500">
                                <Quote size={40} className="text-blue-100 mb-4" />
                                <p className="text-slate-600 italic leading-relaxed font-medium mb-8 min-h-[100px]">
                                    {reviewMessage || "Start typing your review to see it appear here in real-time..."}
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <img src={previewImg || 'https://via.placeholder.com/150'} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-50" alt="" />
                                    <div>
                                        <h4 className="font-black text-slate-800 tracking-tight">{watch("fullName") || "Student Name"}</h4>
                                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                                            {watch("faculty") || "Role"} • {watch("session") || "Session"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SubmitReview;