import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../MainLayout";
import VerifyCertificates from "../components/VerifyCertificates";
import AdminLayout from "../layout/AdminLayout";
import AddCertificate from "../components/AddCertificate";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import AdminRoute from "./AdminRoute";
import UserDashboard from "../layout/UserDashboard";
import Profile from "../components/Profile";
import PrivateRoute from "./PrivateRoute";
import About from "../components/About";
import SubmitReview from "../components/SubmitReview";
import ManageNotices from "../components/admin/ManageNotices";
import Blogs from "../components/Blogs";
import ManageStudents from "../components/admin/ManageStudents";
import ManageMentors from "../components/admin/ManageMentors";
import MentorRoute from "./MentorRoute";
import MentorLayout from "../layout/MentorLayout";
import MentorDashboard from "../components/mentor/MentorDashboard";
import AdminDashboard from "../components/admin/AdminDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, Component: MainLayout },
            {
                path: '/blogs',
                Component: Blogs
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/submit-review',
                Component: SubmitReview
            },
            {
                path: '/certificates',
                Component: VerifyCertificates
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminRoute>
            <AdminLayout />
        </AdminRoute>,
        children: [
            { index: true, Component: AdminDashboard },
            {
                path: '/admin/add-certificate',
                element: <AddCertificate />
            },
            {
                path: '/admin/manage-notice',
                element: <ManageNotices />
            },
            {
                path: '/admin/manage-students',
                element: <ManageStudents />
            },
            {
                path: '/admin/manage-mentors',
                element: <ManageMentors />
            },
        ]
    },
    {
        path: '/mentor',
        element: <MentorRoute>
            <MentorLayout />
        </MentorRoute>,
        children: [
            {
                path: "dashboard",
                element: <MentorDashboard />
            },
            // Placeholders for future steps
            {
                path: "my-students",
                element: <div>My Students Component</div>
            },
            {
                path: "resources",
                element: <div>Resources Component</div>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <UserDashboard />
        </PrivateRoute>,
        children: [
            {
                path: '/dashboard/profile',
                element: <Profile />
            }
        ]
    },
]);