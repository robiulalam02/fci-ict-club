import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useUserRole from "../Hooks/useUserRole"; // Your existing hook
import { Loader2 } from "lucide-react";

const MentorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useUserRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-teal-600" size={40} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verifying Access...</p>
                </div>
            </div>
        );
    }

    if (user && role === 'mentor') {
        return children;
    }

    // Redirect to login if not authorized, saving the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default MentorRoute;