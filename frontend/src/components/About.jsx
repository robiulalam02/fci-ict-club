import React from 'react';
import { Target, Eye, Users, Cpu, Code, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-[#004274] text-xs font-bold uppercase tracking-widest mb-6">
                            Since 2012
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                            Empowering the <span className="text-blue-600">Digital Architects</span> of FCI.
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-10">
                            FCI ICT Club is more than a community; it's a launchpad for innovators,
                            programmers, and tech enthusiasts at Feni Computer Institute.
                        </p>
                    </div>
                </div>
                {/* Decorative Tech Pattern Background */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100/50 clip-path-polygon hidden lg:block">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
                </div>
            </section>

            {/* --- 2. STATS SECTION --- */}
            <section className="py-12 bg-[#004274]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Active Members', value: '200+' },
                            { label: 'Workshops Held', value: '45+' },
                            { label: 'Mentors', value: '15+' },
                            { label: 'Years of Impact', value: '15' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.value}</h2>
                                <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 3. MISSION & VISION --- */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="p-8 bg-blue-50 rounded-[40px] border border-blue-100 transition-transform hover:scale-[1.02]">
                            <div className="w-14 h-14 bg-[#004274] rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                                <Target size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To bridge the gap between academic theory and industry practice by providing
                                hands-on training in competitive programming, web development, and hardware automation.
                            </p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-200 transition-transform hover:scale-[1.02]">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                                <Eye size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To establish Feni Computer Institute as a premier hub for technological
                                excellence and produce leaders who will contribute to Smart Bangladesh 2041.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                            className="rounded-[40px] shadow-2xl"
                            alt="Students working"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl hidden md:block border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-slate-800">+12 Mentor Leads</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. CORE PILLARS --- */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">How We Grow</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">Focusing on the technologies that matter most in today's global landscape.</p>
                </div>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Programming', desc: 'Mastering C++, Java, and Python through regular contests.', icon: <Code />, color: 'text-orange-500' },
                        { title: 'Development', desc: 'Building modern web and mobile applications.', icon: <Globe />, color: 'text-blue-500' },
                        { title: 'Robotics', desc: 'Exploring IoT and hardware-software integration.', icon: <Cpu />, color: 'text-green-500' },
                    ].map((pillar, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                            <div className={`${pillar.color} mb-6 transform group-hover:scale-110 transition-transform`}>
                                {React.cloneElement(pillar.icon, { size: 48 })}
                            </div>
                            <h4 className="text-xl font-black text-slate-800 mb-3">{pillar.title}</h4>
                            <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 5. CTA SECTION --- */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#004274] to-blue-800 rounded-[50px] p-12 lg:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to Code Your Future?</h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                            Join the community of builders, thinkers, and innovators at Feni Computer Institute.
                        </p>
                        <Link to="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#004274] font-black rounded-2xl hover:bg-blue-50 transition-all group">
                            Join the Club <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                </div>
            </section>
        </div>
    );
};

export default About;