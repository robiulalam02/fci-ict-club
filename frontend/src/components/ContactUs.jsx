import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    User,
    AtSign,
    MessageSquare
} from 'lucide-react';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form logic here
        alert("Message Sent!");
    };

    const contactInfo = [
        {
            icon: <Mail size={18} />,
            title: "Email",
            value: "support@fci-ict.com",
            link: "mailto:support@fci-ict.com",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: <Phone size={18} />,
            title: "Phone",
            value: "+880 1812-345678",
            link: "tel:+8801812345678",
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            icon: <MapPin size={18} />,
            title: "Office",
            value: "Feni Computer Institute",
            link: "#",
            color: "text-amber-600",
            bg: "bg-amber-50"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="contact">
            {/* Subtle Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-50 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Main Grid: Switches to 2 columns on 'md' screens (Tablets/Laptops) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* --- LEFT COLUMN: Info & Vector --- */}
                    <div className="flex flex-col h-full">
                        {/* Text Header */}
                        <div className="mb-8 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-3">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                Contact Support
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                                Get in <span className="text-blue-600">Touch</span>
                            </h2>
                            <p className="text-slate-500 mt-4 text-base md:text-lg">
                                Have a question about the club, membership, or upcoming events? We are here to help.
                            </p>
                        </div>

                        {/* Vector Image - Visible on Mobile & Desktop */}
                        <div className="w-full flex justify-center md:justify-start mb-8 md:mb-12">
                            <img
                                src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
                                alt="Contact Vector"
                                className="w-64 h-auto md:w-80 lg:w-96 object-contain mix-blend-multiply"
                            />
                        </div>

                        {/* Minimalist Contact Info List (Placed at bottom of left col) */}
                        {/* <div className="mt-auto space-y-4 md:space-y-3 pl-2">
                            {contactInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="flex items-center gap-4 group w-fit"
                                >
                                    <div className={`p-2.5 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{item.title}</p>
                                        <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div> */}
                    </div>

                    {/* --- RIGHT COLUMN: The Form --- */}
                    <div className="relative">
                        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6">Send Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative group">
                                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Message</label>
                                    <div className="relative group">
                                        <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        <textarea
                                            placeholder="How can we help?"
                                            rows="4"
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                                >
                                    <span>Submit Request</span>
                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>

                        {/* Decor blobs */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;