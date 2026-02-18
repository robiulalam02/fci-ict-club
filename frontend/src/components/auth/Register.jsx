import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import {
    User, Mail, Lock, BookOpen, Calendar, ArrowRight,
    Hash, Clock, Phone, MapPin, Briefcase, Eye, EyeOff, Loader2
} from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { updateProfile } from "firebase/auth";
import { toast } from 'sonner';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm();
    const password = watch("password", "");

    const DEFAULT_PHOTO = "https://i.ibb.co.com/zhKZ1J8b/profile-icon-vector-image-can-be-used-ui-120816-260932.webp";

    const onSubmit = async (data) => {
        const toastId = toast.loading('Creating your account...');
        try {
            const result = await createUser(data.email, data.password);

            await updateProfile(result.user, {
                displayName: data.name,
                photoURL: DEFAULT_PHOTO
            });

            const { password, ...userInfo } = data;
            const finalData = {
                ...userInfo,
                uid: result.user.uid,
                profilePhoto: DEFAULT_PHOTO,
                role: 'student',
                createdAt: new Date(),
            };

            await axiosPublic.post('/users', finalData);
            const tokenRes = await axiosPublic.post('/api/jwt', { email: data.email });

            if (tokenRes.data.token) {
                localStorage.setItem('access-token', tokenRes.data.token);
                toast.success('Registration Successful!', { id: toastId });
                navigate("/");
            }
        } catch (error) {
            setError("root", { type: "manual", message: error.message });
            toast.error(error.message || 'Registration failed', { id: toastId });
        }
    };

    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        return strength;
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-slate-50 py-16 px-4">
            <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-slate-100">
                <div className="mb-12 text-center">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">Join the <span className="text-blue-600">Club</span></h3>
                    <p className="text-slate-500 mt-2 font-medium">Verify your student details and start your journey.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input {...register("name", { required: "Name is required" })} type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs ml-2">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs ml-2">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input {...register("boardRoll", { required: true })} type="text" placeholder="Board Roll" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="relative">
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select {...register("department", { required: true })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-slate-600">
                                <option value="">Department</option>
                                <option value="CST">Computer Science & Technology</option>
                                <option value="TCT">Telecommunication Technology</option>
                            </select>
                        </div>

                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input {...register("session", { required: true })} type="text" placeholder="Session (e.g. 2022-23)" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select {...register("shift", { required: true })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-slate-600">
                                <option value="">Select Shift</option>
                                <option value="1st">1st Shift</option>
                                <option value="2nd">2nd Shift</option>
                            </select>
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input {...register("phone", { required: true })} type="text" placeholder="Phone Number" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select {...register("course", { required: true })} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-slate-600">
                                <option value="">Select Faculty/Course</option>
                                <option value="Web Design & Development">Web Design & Development</option>
                                <option value="Computer Programming">Computer Programming</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="Cyber Security & Networking">Cyber Security & Networking</option>
                                <option value="Power & Circuit Course">Power & Circuit Course</option>
                            </select>
                        </div>

                        <div className="relative md:col-span-2">
                            <MapPin className="absolute left-4 top-6 text-slate-400" size={18} />
                            <textarea {...register("presentAddress", { required: true })} placeholder="Present Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="2"></textarea>
                        </div>

                        <div className="relative md:col-span-2">
                            <MapPin className="absolute left-4 top-6 text-slate-400" size={18} />
                            <textarea {...register("permanentAddress", { required: true })} placeholder="Permanent Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="2"></textarea>
                        </div>

                        <div className="relative md:col-span-2 space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Minimum 8 characters" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            message: "Must include Uppercase, Lowercase, Number & Special Char"
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {password && (
                                <div className="px-2 space-y-1">
                                    <div className="flex gap-1 h-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`h-full flex-1 rounded-full transition-all duration-500 ${i < getStrength(password) ? (getStrength(password) <= 2 ? 'bg-red-400' : getStrength(password) <= 4 ? 'bg-yellow-400' : 'bg-green-500') : 'bg-slate-100'}`} />
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Strength: {getStrength(password) <= 2 ? 'Weak' : getStrength(password) <= 4 ? 'Medium' : 'Strong'}
                                    </p>
                                </div>
                            )}
                            {errors.password && <p className="text-red-500 text-xs ml-2">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-[24px] shadow-xl hover:shadow-blue-900/20 flex items-center justify-center gap-3 group mt-4 transition-all disabled:opacity-70"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                        {isSubmitting ? "Creating Account..." : "Register Account"}
                    </button>
                </form>

                <p className="text-center mt-10 text-slate-500 font-medium">
                    Already have an account? <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">Sign In</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;