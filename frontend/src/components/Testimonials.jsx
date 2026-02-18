import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Aisha Rahman",
            role: "Web Development Trainee",
            batch: "3rd Batch",
            image: "https://i.ibb.co/5R6Y3mX/student1.jpg",
            review: "The ICT Club has been a game-changer for my coding journey. The mentors are incredibly supportive and the workshops are top-notch!",
        },
        {
            id: 2,
            name: "Rajiv Chowdhury",
            role: "Competitive Programmer",
            batch: "2nd Batch",
            image: "https://i.ibb.co/m0fH4qV/student2.jpg",
            review: "I learned more about algorithms in two months here than I did in a year of self-study. The community is so inspiring!",
        },
        {
            id: 3,
            name: "Fatima Akter",
            role: "Cyber Security Enthusiast",
            batch: "4th Batch",
            image: "https://i.ibb.co/VvzYn0n/student3.jpg",
            review: "A professional and friendly environment. The certificate verification system makes our achievements feel official and valued.",
        },
        {
            id: 4,
            name: "Nabil Khan",
            role: "Graphics Designer",
            batch: "3rd Batch",
            image: "https://i.ibb.co/L9H8b8p/student4.jpg",
            review: "Being part of the ICT Club helped me build my portfolio and get my first freelance client. Highly recommended for every FCI student.",
        },
        {
            id: 4,
            name: "Nabil Khan",
            role: "Graphics Designer",
            batch: "3rd Batch",
            image: "https://i.ibb.co/L9H8b8p/student4.jpg",
            review: "Being part of the ICT Club helped me build my portfolio and get my first freelance client. Highly recommended for every FCI student.",
        },
        {
            id: 4,
            name: "Nabil Khan",
            role: "Graphics Designer",
            batch: "3rd Batch",
            image: "https://i.ibb.co/L9H8b8p/student4.jpg",
            review: "Being part of the ICT Club helped me build my portfolio and get my first freelance client. Highly recommended for every FCI student.",
        },
        {
            id: 4,
            name: "Nabil Khan",
            role: "Graphics Designer",
            batch: "3rd Batch",
            image: "https://i.ibb.co/L9H8b8p/student4.jpg",
            review: "Being part of the ICT Club helped me build my portfolio and get my first freelance client. Highly recommended for every FCI student.",
        },
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <style>
                {`
                    .testimonial-swiper .swiper-slide {
                        transition: all 0.5s ease;
                        opacity: 0.4;
                        transform: scale(0.85);
                    }
                    .testimonial-swiper .swiper-slide-active {
                        opacity: 1;
                        transform: scale(1.05) translateY(-10px);
                        z-index: 10;
                    }
                `}
            </style>

            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                        Voices of Our <span className="text-blue-600">Members</span>
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium">
                        Real stories from students who transformed their technical skills with FCI ICT Club.
                    </p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    centeredSlides={true} // Makes the middle one the focal point
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1.5 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="testimonial-swiper pb-20 !overflow-visible"
                >
                    {reviews.map((item) => (
                        <SwiperSlide key={item.id} className="h-full">
                            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-xl flex flex-col h-full justify-between transition-all duration-500 hover:shadow-blue-500/10">

                                <div className="mb-8">
                                    <Quote size={40} className="text-blue-200 mb-4" />
                                    <p className="text-slate-600 text-lg italic leading-relaxed font-medium">
                                        {item.review}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                                    />
                                    <div>
                                        <h4 className="font-black text-slate-800">{item.name}</h4>
                                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                                            {item.role} • {item.batch}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;