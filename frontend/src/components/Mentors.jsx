import React from 'react';
import { User, Calendar, GraduationCap } from 'lucide-react';
import abir from '../assets/mentors/abir.jpg'
import sunny from '../assets/mentors/sunny.jpg'
import nahid from '../assets/mentors/nahid.png'
import robiul from '../assets/mentors/robiul.JPG'
import sakib from '../assets/mentors/sakib.webp'
import sobuj from '../assets/mentors/sobuj.png'
import saidul from '../assets/mentors/saidul.jpg'
import ornob from '../assets/mentors/ornob.JPG'
import meheraz from '../assets/mentors/meheraz.webp'
import junaed from '../assets/mentors/junaed.webp'

const Mentors = () => {
    const mentors = [
        {
            id: 1,
            name: "Al Musabbir Abir",
            department: "Cyber Security & Networking",
            session: "2022-23",
            image: abir,
        },
        {
            id: 2,
            name: "Arafat Sunny",
            department: "Power & Circuit",
            session: "2022-23",
            image: sunny,
        },
        {
            id: 3,
            name: "Nahidul Islam Rabbi",
            department: "Web Development",
            session: "2022-23",
            image: nahid,
        },
        {
            id: 4,
            name: "Sakibul Hasan",
            department: "Graphics Design",
            session: "2022-23",
            image: sakib,
        },
        {
            id: 5,
            name: "Robiul Alam",
            department: "Web Development",
            session: "2022-23",
            image: robiul,
        },
        {
            id: 6,
            name: "Saidul Islam",
            department: "Graphics Design",
            session: "2022-23",
            image: saidul,
        },
        {
            id: 7,
            name: "Abdul Motaleb Sobuj",
            department: "Web Development",
            session: "2022-23",
            image: sobuj,
        },
        {
            id: 8,
            name: "Sadman Ornob",
            department: "Web Development",
            session: "2022-23",
            image: ornob,
        },
        {
            id: 9,
            name: "Mosaiyeb Meheraz",
            department: "Web Development",
            session: "2022-23",
            image: meheraz,
        },
        {
            id: 10,
            name: "Junaed Monaowar",
            department: "Graphics Design",
            session: "2022-23",
            image: junaed,
        },
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#004274] text-center">
                        Our Mentors
                    </h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mt-4"></div>
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-center">
                        Meet the visionaries dedicated to bridging the gap between academic learning and technical excellence.
                    </p>
                </div>

                {/* Mentors Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200">
                            {/* Mentor Image */}
                            <img 
                                src={mentor.image} 
                                alt={mentor.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Gradient Overlay - Shorter for better visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:via-black/50 transition-all duration-300"></div>

                            {/* Floating Info Card - More compact */}
                            <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl transform transition-transform duration-300 group-hover:-translate-y-1">
                                <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1">
                                    {mentor.name}
                                </h3>
                                
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-blue-300 text-[10px] md:text-xs font-medium">
                                        <GraduationCap size={12} />
                                        <span className="line-clamp-1">{mentor.department}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-300 text-[10px] md:text-xs">
                                        <Calendar size={12} />
                                        <span>{mentor.session}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mentors;