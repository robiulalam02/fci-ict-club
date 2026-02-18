import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. Show a professional loading state while Firebase checks the session
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-[#004274] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#004274] font-bold animate-pulse tracking-widest uppercase text-xs">
                    Authenticating...
                </p>
            </div>
        );
    }

    // 2. If user is logged in, allow them to see the content
    if (user) {
        return children;
    }

    // 3. If not logged in, redirect to login page
    // We pass the 'location' in state so the Login page knows where to send them back
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;