import React from 'react';
import { Facebook, Linkedin, Phone } from 'lucide-react';
import presidentImg from '../assets/president.webp'
import vicepresidentImg from '../assets/vice-president.webp'
import generalsecretaryImg from '../assets/general-secretary.webp'
import jointgsImg from '../assets/joint-gs.webp'
import mediasecretaryImg from '../assets/media-secretary.webp'

const Committee = () => {
    const members = [
        { id: 1, name: "Mosaiyeb Meheraz", designation: "President", image: presidentImg, fb: "#", linkedin: "#", phone: "+1234567890" },
        { id: 2, name: "Saidul Islam", designation: "Vice President", image: vicepresidentImg, fb: "#", linkedin: "#", phone: "+1234567891" },
        { id: 3, name: "Robiul Alam", designation: "General Secretary", image: generalsecretaryImg, fb: "#", linkedin: "#", phone: "+1234567892" },
        { id: 4, name: "Junaed Monaowar", designation: "Joint Secretary", image: jointgsImg, fb: "#", linkedin: "#", phone: "+1234567893" },
        { id: 5, name: "Sakibul Hasan", designation: "Media & Finance Secretary", image: mediasecretaryImg, fb: "#", linkedin: "#", phone: "+1234567894" }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#004274] mb-4">
                        Our Committee
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                        Meet the dedicated visionaries and professionals of FCI ICT Club student council guiding our students toward excellence and innovation.
                    </p>
                </div>

                {/* Grid System */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="group relative w-full bg-slate-50 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[3/4] sm:aspect-[4/5]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                />

                                {/* Social Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004274]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 md:pb-8">
                                    <div className="flex gap-2 md:gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                        <a href={member.fb} className="p-1.5 md:p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors">
                                            <Facebook size={18} />
                                        </a>
                                        <a href={member.linkedin} className="p-1.5 md:p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-blue-700 transition-colors">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href={`tel:${member.phone}`} className="p-1.5 md:p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-green-600 transition-colors">
                                            <Phone size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="py-4 md:py-6 px-2 text-center">
                                <h3 className="text-sm md:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-1">
                                    {member.name}
                                </h3>
                                <p className="text-[10px] md:text-sm font-medium text-blue-600 uppercase tracking-wider mt-1">
                                    {member.designation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Committee;