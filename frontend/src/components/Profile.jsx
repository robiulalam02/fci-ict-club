import React, { useState, useContext, useEffect, useRef } from 'react';
import { Camera, Mail, User, BookOpen, Calendar, MapPin, Phone, Briefcase, Save, Loader2 } from 'lucide-react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { imageUpload } from '../utils/imageUpload';
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);


    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        location: '',
        bio: '',
        department: '',
        session: '',
        title: '',
        profilePhoto: ''
    });

    // Fetch user data from MongoDB
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/user/${user.email}`)
                .then(res => setUserData(res.data))
                .catch(err => console.error(err));
        }
    }, [user, axiosSecure]);

    // console.log(userData)

    // AUTO-SAVE IMAGE UPLOAD
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Upload to ImgBB
            const url = await imageUpload(file);

            // 2. Update Firebase Auth (Updates Navbar instantly)
            await updateProfile(user, { photoURL: url });

            // 3. Update MongoDB immediately (Auto-Save)
            const res = await axiosSecure.patch(`/user/${userData._id}`, { profilePhoto: url });

            if (res.data.modifiedCount > 0) {
                setUserData(prev => ({ ...prev, profilePhoto: url }));
                Swal.fire({
                    icon: 'success',
                    title: 'Photo updated & saved!',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire('Error', 'Could not save photo.', 'error');
        } finally {
            setUploading(false);
        }
    };

    // SAVE TEXT FIELDS
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosSecure.patch(`/user/${userData._id}`, userData);
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { popup: 'rounded-[32px]' }
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to save changes.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-10">
            {/* HEADER / COVER SECTION */}
            <div className="relative mb-28">
                <div className="h-48 md:h-64 w-full bg-gradient-to-r from-cyan-600 to-[#004274] rounded-t-[40px] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>

                {/* PROFILE IMAGE OVERLAP */}
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="relative group">
                        <img
                            src={userData.profilePhoto || user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className={`w-32 h-32 md:w-44 md:h-44 rounded-[40px] border-4 border-white shadow-2xl object-cover transition-all ${uploading ? 'blur-sm grayscale' : ''}`}
                        />
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="animate-spin text-white" size={40} />
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            disabled={uploading}
                            className="absolute bottom-2 right-2 p-3 bg-white rounded-2xl shadow-xl text-blue-600 hover:scale-110 active:scale-95 transition-all border border-slate-100 disabled:opacity-50"
                        >
                            <Camera size={20} />
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <h2 className="text-4xl font-bold text-slate-800 tracking-tight">{userData.name || user?.displayName}</h2>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-sm">{userData.role || 'Member'}</p>
                    </div>
                </div>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">

                {/* LEFT: PERSONAL INFO */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email (Verified)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="email" disabled className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 cursor-not-allowed" value={user?.email} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" placeholder="+880" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" value={userData.phone || ''} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Home Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" placeholder="Feni, BD" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" value={userData.location || ''} onChange={(e) => setUserData({ ...userData, location: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Your Tech Story (Bio)</h3>
                        <textarea rows="5" placeholder="Share your coding journey..." className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all" value={userData.bio || ''} onChange={(e) => setUserData({ ...userData, bio: e.target.value })} />
                    </div>
                </div>

                {/* RIGHT: ACADEMIC & ACTION */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Academic Info</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-5 p-5 bg-blue-50 rounded-3xl border border-blue-100/50">
                                <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-sm"><BookOpen size={24} /></div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Dept.</p>
                                    <p className="text-slate-800 font-bold">{userData.department || 'Not Set'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 p-5 bg-purple-50 rounded-3xl border border-purple-100/50">
                                <div className="bg-white p-3 rounded-2xl text-purple-600 shadow-sm"><Calendar size={24} /></div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Session</p>
                                    <p className="text-slate-800 font-bold">{userData.session || 'Not Set'}</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Professional Title</label>
                                <div className="relative mt-3">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" placeholder="e.g. Frontend Developer" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" value={userData.title || ''} onChange={(e) => setUserData({ ...userData, title: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-[#004274] hover:bg-blue-800 text-white font-bold py-5 rounded-[32px] shadow-2xl hover:shadow-blue-900/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={22} />}
                        {loading ? 'Processing...' : 'Sync Profile Data'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;