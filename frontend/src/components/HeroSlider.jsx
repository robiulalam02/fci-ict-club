import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Banner2 from '../assets/banner-2.webp';
import Banner3 from '../assets/banner-3.webp';
import Banner4 from '../assets/banner-4.webp';

import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';

const HeroSlider = () => {
    const slides = [
        {
            image: Banner3,
            title: "Innovation at FCI",
            subtitle: "The largest digital collective at Feni Computer Institute.",
            btn: "Join the Club",
            link: "/register"
        },
        {
            image: Banner4,
            title: "Recognize Officially",
            subtitle: "Verify your achievements with our system.",
            btn: "Verify Now",
            link: "/verify"
        },
        {
            image: Banner2,
            title: "Build Together",
            subtitle: "Hands-on mentorship in Web Dev, Robotics, and beyond.",
            btn: "Explore More",
            link: "/about"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full bg-black overflow-hidden h-[620px]">
            <Swiper
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Autoplay, EffectFade]}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="bg-black">
                        <div className="relative w-full h-full flex items-center">
                            {/* Background Image Layer */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={slide.image}
                                    className="w-full h-full object-cover opacity-70"
                                    alt="banner"
                                />
                                {/* Bottom-focused gradient to keep background clear while making text readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>

                            {/* Content Layer */}
                            <div className="container mx-auto w-full lg:max-w-7xl px-4 relative z-10">
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    key={index} // Reset animation on slide change
                                    className="max-w-3xl space-y-6"
                                >
                                    {/* Headline */}
                                    <motion.h1
                                        variants={itemVariants}
                                        className="text-4xl md:text-6xl font-black text-white leading-none"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-slate-300 text-md md:text-lg max-w-lg font-medium leading-relaxed opacity-90"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    {/* Minimalist Action */}
                                    <motion.div variants={itemVariants} className="pt-4">
                                        <Link
                                            to={slide.link}
                                            className="inline-flex items-center gap-3 group text-white font-black text-xs uppercase tracking-[3px] border-b-2 border-blue-600 pb-2 hover:text-blue-400 hover:border-blue-400 transition-all duration-300"
                                        >
                                            {slide.btn}
                                            <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;