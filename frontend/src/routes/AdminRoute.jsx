import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import useUserRole from '../Hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useUserRole();
    const location = useLocation();

    // 1. Loading State
    if (loading || isRoleLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-[#004274] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#004274] font-bold animate-pulse">Verifying Admin Access...</p>
            </div>
        );
    }

    // 2. Authorized State
    if (user && role === 'admin') {
        return children;
    }

    // 3. Restriction State (Show this UI if not an admin)
    return (
        <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full text-center bg-white p-10 rounded-[32px] shadow-xl border border-slate-100">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-500 rounded-full mb-6">
                    <ShieldAlert size={44} />
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-4">Access Denied</h2>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    Oops! You don't have the administrative permissions required to access this page.
                    Please contact the <strong>FCI ICT Club</strong> board if you believe this is a mistake.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-[#004274] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                    >
                        <Home size={18} /> Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 font-semibold py-2 transition-colors"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AdminRoute;