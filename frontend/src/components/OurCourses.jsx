import React from 'react';
import CoursesImg1 from '../assets/courses-1.webp';
import CoursesImg2 from '../assets/courses-2.webp';
import CoursesImg3 from '../assets/courses-3.webp';
import CoursesImg4 from '../assets/courses-4.webp';

const OurCourses = () => {
    const courses = [
        { 
            id: 1, 
            title: 'Web Design & Development', 
            desc: "Master modern frontend and backend technologies to build responsive, high-performance websites.",
            icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        },
        { 
            id: 2, 
            title: 'Computer Programming', 
            desc: "Dive deep into logic and algorithms using languages like Python, Java, and C++ for software solutions.",
            icon: <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        },
        { 
            id: 3, 
            title: 'Graphics Design', 
            desc: "Unleash creativity with Adobe Creative Suite, focusing on visual hierarchy, branding, and UI layout.",
            icon: <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        },
        { 
            id: 4, 
            title: 'Cyber Security & Networking', 
            desc: "Learn to protect digital assets, manage secure networks, and defend against evolving cyber threats.",
            icon: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        },
        { 
            id: 5, 
            title: 'Power & Circuit Course', 
            desc: "Understand electrical engineering fundamentals, circuit analysis, and power system management.",
            icon: <path d="M13 2L3 14h7v8l10-12h-7l3-8z"/>
        },
    ];

    return (
        <section className="w-full bg-slate-100 py-16"> 
            <div className="max-w-7xl mx-auto px-4">
                
                <h2 className='text-center text-3xl md:text-5xl font-extrabold text-[#004274] mb-4'>
                    Our Courses & Faculties
                </h2>
                <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                <p className='text-center mt-6 text-gray-600 max-w-2xl mx-auto mb-16'>
                    Expert-led technical training designed to prepare you for the most in-demand careers in technology and engineering.
                </p>

                <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-20">

                    {/* Left Side: Course List */}
                    <div className="w-full lg:w-3/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            {courses.map((course) => (
                                <div key={course.id} className="flex items-start gap-4 group">
                                    <div className="shrink-0 w-12 h-12 bg-[#004274] rounded-xl flex items-center justify-center shadow-md group-hover:bg-blue-600 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            {course.icon}
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {course.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Image Collage */}
                    <div className="w-full lg:w-2/5 flex justify-center items-center ">
                        <div className="grid grid-cols-2 gap-4 max-w-md">
                            <img src={CoursesImg1} alt="Web Dev" className="w-full aspect-square object-cover rounded-2xl shadow-xl border-4 border-white transform hover:-rotate-2 transition-transform duration-300" />
                            <img src={CoursesImg2} alt="Programming" className="w-full aspect-square object-cover rounded-2xl shadow-xl border-4 border-white lg:mt-10 transform hover:rotate-2 transition-transform duration-300" />
                            <img src={CoursesImg3} alt="Design" className="w-full aspect-square object-cover rounded-2xl shadow-xl border-4 border-white lg:-mt-10 transform hover:-rotate-2 transition-transform duration-300" />
                            <img src={CoursesImg4} alt="Success" className="w-full aspect-square object-cover rounded-2xl shadow-xl border-4 border-white transform hover:rotate-2 transition-transform duration-300" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OurCourses;