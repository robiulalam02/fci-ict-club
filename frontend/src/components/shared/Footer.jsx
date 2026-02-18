import React from 'react';
import {
    Github, Linkedin, Globe, Facebook, MessageCircle,
    Home, Bell, BookOpen, Heart, Cpu, Code2
} from 'lucide-react';
import LogoHome from '../LogoHome';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: 'Home', icon: <Home size={14} />, href: '/' },
        { name: 'Notices', icon: <Bell size={14} />, href: '/notices' },
        { name: 'Blogs', icon: <BookOpen size={14} />, href: '/blogs' },
    ];

    const connectLinks = [
        { name: 'Facebook', icon: <Facebook size={14} />, href: '#' },
        { name: 'LinkedIn', icon: <Linkedin size={14} />, href: '#' },
        { name: 'Discord', icon: <MessageCircle size={14} />, href: '#' },
    ];

    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-8 relative overflow-hidden">
            {/* Minimalist Background Detail */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -z-0"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">

                    {/* Left: Brand & Statement */}
                    <div className="max-w-xs space-y-6">
                        <LogoHome />
                        <p className="text-slate-500 text-sm leading-relaxed font-medium mt-5">
                            The official technology and innovation hub of Feni Computer Institute.
                            Fostering excellence in telecommunications and software engineering.
                        </p>
                    </div>

                    {/* Center: Navigation & Social */}
                    <div className="grid grid-cols-2 gap-12 sm:gap-24">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Explore</h4>
                            <ul className="space-y-4">
                                {navLinks.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="flex items-center gap-3 text-sm font-bold text-gray-800 hover:text-blue-600 transition-all group">
                                            <span className="text-slate-600 group-hover:text-blue-600 transition-colors">
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Follow</h4>
                            <ul className="space-y-4">
                                {connectLinks.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="flex items-center gap-3 text-sm font-bold text-gray-800 hover:text-blue-600 transition-all group">
                                            <span className="text-slate-600 group-hover:text-blue-600 transition-colors">
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Signature Row */}
                <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Copyright Statement */}
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
                        © {currentYear} FCI ICT CLUB • ALL RIGHTS RESERVED
                    </p>

                    {/* Developer Credit - Minimal & Specific */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-px h-4 bg-slate-200 hidden md:block"></div>
                            <div className="text-center md:text-right">
                                <span className="block text-center md:text-start text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Developed By</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-800 text-[11px] font-black uppercase tracking-wider">Robiul Alam</span>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-md uppercase">18th Batch • TCT</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="https://github.com/yourusername" className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={16} /></a>
                            <a href="https://linkedin.com/in/yourusername" className="text-slate-400 hover:text-slate-900 transition-colors"><Linkedin size={16} /></a>
                            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Globe size={16} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;