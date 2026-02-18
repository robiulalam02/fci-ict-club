import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // New optimized handling
import { Send, Link as LinkIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddCertificate = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    // Initializing hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            status: 'Verified'
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // axiosSecure automatically attaches the JWT token from your headers
            const res = await axiosSecure.post('/api/certificates', data);

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Certificate published successfully.',
                    icon: 'success',
                    confirmButtonColor: '#004274',
                    customClass: { popup: 'rounded-[24px]' }
                });
                reset(); // Clears form after success
            }
        } catch (error) {
            console.error("Submission Error:", error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to publish certificate.',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-10">
            <div className="mb-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <CheckCircle2 size={12} /> Registrar Office
                </div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Issue Digital Certificate</h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 md:p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-7"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Validation ID */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Validation ID</label>
                        <input
                            {...register("validationId", { required: "Validation ID is required" })}
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.validationId ? 'border-red-500' : 'border-slate-200'} bg-slate-50 outline-none transition-all font-medium text-slate-700`}
                            placeholder="fciict_wd_2026_001"
                        />
                        {errors.validationId && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.validationId.message}</p>}
                    </div>

                    {/* Issue Date */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Issue Date</label>
                        <input
                            type="date"
                            {...register("issueDate", { required: "Date is required" })}
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.issueDate ? 'border-red-500' : 'border-slate-200'} bg-slate-50 outline-none transition-all font-medium text-slate-700`}
                        />
                    </div>
                </div>

                {/* Student Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Recipient Full Name</label>
                    <input
                        {...register("studentName", { required: "Student name is required" })}
                        className={`w-full px-5 py-4 rounded-2xl border ${errors.studentName ? 'border-red-500' : 'border-slate-200'} bg-slate-50 outline-none transition-all font-medium text-slate-700`}
                        placeholder="e.g. Robiul Alam"
                    />
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Academic Program</label>
                    <select
                        {...register("courseTitle", { required: "Please select a course" })}
                        className={`w-full px-5 py-4 rounded-2xl border ${errors.courseTitle ? 'border-red-500' : 'border-slate-200'} bg-slate-50 outline-none transition-all font-bold text-slate-700 cursor-pointer`}
                    >
                        <option value="">Choose a Faculty/Program</option>
                        <option value="Web Design & Development">Web Design & Development</option>
                        <option value="Computer Programming">Computer Programming</option>
                        <option value="Graphics Design">Graphics Design</option>
                    </select>
                </div>

                {/* PDF Link Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                        <LinkIcon size={14} className="text-blue-600" />
                        Storage URL (PDF)
                    </label>
                    <input
                        type="url"
                        {...register("pdfLink", { required: "PDF link is required" })}
                        className={`w-full px-5 py-4 rounded-2xl border ${errors.pdfLink ? 'border-red-500' : 'border-slate-200'} bg-slate-50 outline-none transition-all font-medium text-slate-700`}
                        placeholder="https://cloud-storage.com/cert-id.pdf"
                    />
                </div>

                {/* Action Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-[20px] transition-all duration-300 shadow-xl shadow-blue-900/20 disabled:opacity-80"
                >
                    <span className="flex items-center justify-center gap-3">
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Publishing Record...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Issue Certificate
                            </>
                        )}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default AddCertificate;