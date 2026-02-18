import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'sonner';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading('Verifying your credentials...');

        try {
            const result = await signIn(data.email, data.password);
            const loggedUser = result.user;

            await axiosPublic.post('/users', {
                email: loggedUser.email,
                name: loggedUser.displayName
            });

            const res = await axiosPublic.post('/api/jwt', { email: loggedUser.email });

            if (res.data.token) {
                localStorage.setItem('access-token', res.data.token);

                // SUCCESS: Beautiful Green Toast
                toast.success(`Welcome back, ${loggedUser.displayName || 'Member'}!`, {
                    id: toastId,
                    // description: 'You have been authenticated successfully.',
                });

                navigate(from, { replace: true });
            }
        } catch (error) {
            setError("root", { type: "manual", message: error.message });

            const errorMessage = error.code === 'auth/invalid-credential'
                ? "Wrong email or password. Please check again."
                : "Login failed. Please try again later.";

            // ERROR: Solid Red Toast
            toast.error(errorMessage, {
                id: toastId,
                // description: 'Authentication Error',
            });
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-slate-50 py-16 px-4">
            <div className="max-w-lg w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-14 border border-slate-100">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-[24px] mb-6 text-blue-600 shadow-sm">
                        <ShieldCheck size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">Sign In</h3>
                    <p className="text-slate-500 mt-2 font-medium">Access your FCI ICT Club dashboard.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs ml-2 font-bold">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                {...register("password", { required: "Password is required" })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs ml-2 font-bold">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#004274] hover:bg-blue-800 text-white font-black py-5 rounded-[24px] shadow-xl hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:grayscale"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                        {isSubmitting ? "Authenticating..." : "Sign In to Account"}
                    </button>
                </form>

                <div className="mt-12 space-y-4 text-center">
                    <p className="text-slate-500 font-medium text-sm">
                        Don't have an account yet?
                        <Link to="/register" className="text-blue-600 font-black hover:underline underline-offset-4 ml-2">
                            Create Account
                        </Link>
                    </p>
                    <div className="pt-4">
                        <Link to="/" className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;