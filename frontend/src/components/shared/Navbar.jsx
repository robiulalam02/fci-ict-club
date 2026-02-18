import React, { useContext, Fragment, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, Transition, Dialog } from '@headlessui/react'
import LogoHome from '../LogoHome'
import Logo from '../../assets/logo.png'
import { AuthContext } from '../../Providers/AuthProvider'
import { User, LayoutDashboard, LogOut, X, Menu as MenuIcon, ChevronRight, Home, BookOpen, Award, Info } from 'lucide-react'

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false); // State for Mobile Drawer

    const handleSignOut = () => {
        logOut();
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Blogs', path: '/blogs', icon: <BookOpen size={18} /> },
        { name: 'Verify Certificates', path: '/certificates', icon: <Award size={18} /> },
        { name: 'About us', path: '/about', icon: <Info size={18} /> },
    ];

    return (
        <div className="navbar bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto w-full flex items-center px-4 lg:px-0">

                {/* --- MOBILE: DRAWER TRIGGER --- */}
                <div className="navbar-start flex lg:hidden">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <MenuIcon size={28} />
                    </button>
                </div>

                <div className="navbar-start hidden lg:flex">
                    <LogoHome />
                </div>

                {/* --- DESKTOP: CENTER LINKS --- */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-5 text-[0.85rem] font-medium uppercase tracking-wider">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive ? "bg-white/20 px-4 py-2 rounded-xl transition-all" : "hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- DESKTOP: END PROFILE --- */}
                <div className="navbar-end gap-4 flex items-center">
                    {user ? (
                        <div className="hidden lg:block">
                            <Menu as="div" className="relative text-left inline-block">
                                <Menu.Button className="focus:outline-none group cursor-pointer">
                                    <div className="p-0.5 rounded-full border-2 border-transparent group-hover:border-cyan-300 transition-all">
                                        <img
                                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                                            className="h-10 w-10 rounded-full object-cover shadow-md"
                                            alt="User"
                                        />
                                    </div>
                                </Menu.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden">
                                        <div className="px-4 py-4 bg-slate-50 text-slate-800">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                                            <p className="text-sm font-bold truncate">{user?.displayName}</p>
                                        </div>
                                        <div className="p-2">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/dashboard" className={`${active ? 'bg-blue-50 text-blue-700' : 'text-slate-700'} group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold`}>
                                                        <LayoutDashboard size={18} /> Dashboard
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/dashboard/profile" className={`${active ? 'bg-blue-50 text-blue-700' : 'text-slate-700'} group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold`}>
                                                        <User size={18} /> My Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="p-2">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button onClick={handleSignOut} className={`${active ? 'bg-red-50 text-red-600' : 'text-red-500'} group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold`}>
                                                        <LogOut size={18} /> Logout
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    ) : (
                        <div className="hidden lg:flex gap-3">
                            <Link className='btn bg-transparent text-white border-none rounded-full shadow-none px-6' to="/login">Login</Link>
                            <Link className='btn bg-white text-blue-700 hover:bg-slate-100 border-none px-6 rounded-full shadow-none' to="/register">Join Club</Link>
                        </div>
                    )}

                    <div className='flex lg:hidden'>
                        <img src={Logo} alt="Logo" className='w-12' />
                    </div>
                </div>
            </div>

            {/* --- HEADLESS UI: MOBILE SLIDE DRAWER --- */}
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[150] lg:hidden" onClose={setIsOpen}>
                    {/* Dark Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-[#004274] pb-12 shadow-xl">
                                {/* Drawer Header */}
                                <div className="flex px-4 pb-2 pt-5 justify-between items-center border-b border-white/10">
                                    <img src={Logo} alt="Logo" className="w-10" />
                                    <button
                                        type="button"
                                        className="rounded-lg p-2 text-white hover:bg-white/10"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Drawer Content: User Info */}
                                {user && (
                                    <div className="px-6 py-8 bg-white/5">
                                        <div className="flex items-center gap-4">
                                            <img src={user?.photoURL} className="w-14 h-14 rounded-2xl border-2 border-cyan-400 object-cover" alt="" />
                                            <div className="overflow-hidden">
                                                <p className="font-bold text-lg truncate">{user?.displayName}</p>
                                                <p className="text-xs text-cyan-300 font-bold uppercase tracking-widest">FCI ICT Club</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Drawer Navigation Links */}
                                <div className="mt-6 px-4 space-y-2">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => `
                                                flex items-center gap-4 px-4 py-4 rounded-2xl transition-all
                                                ${isActive ? 'bg-white text-blue-800 font-bold' : 'text-white/80 hover:bg-white/10'}
                                            `}
                                        >
                                            {link.icon}
                                            <span>{link.name}</span>
                                        </NavLink>
                                    ))}
                                </div>

                                {/* Drawer Footer: Account Actions */}
                                <div className="mt-auto px-4 pt-10 border-t border-white/10">
                                    {user ? (
                                        <div className="space-y-2">
                                            <Link onClick={() => setIsOpen(false)} to="/dashboard" className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/80 hover:bg-white/10">
                                                <LayoutDashboard size={18} /> Dashboard
                                            </Link>
                                            <Link onClick={() => setIsOpen(false)} to="/dashboard/profile" className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/80 hover:bg-white/10">
                                                <User size={18} /> My Profile
                                            </Link>
                                            <button onClick={handleSignOut} className="flex items-center gap-4 px-4 py-4 rounded-2xl w-full text-red-300 hover:bg-red-500/10 transition-colors">
                                                <LogOut size={18} /> Logout Account
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-3">
                                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn bg-white/10 text-white border-none h-14 rounded-2xl">Login</Link>
                                            <Link to="/register" onClick={() => setIsOpen(false)} className="btn bg-white text-blue-700 border-none h-14 rounded-2xl">Register</Link>
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default Navbar;