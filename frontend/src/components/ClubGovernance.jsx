import React, { useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import {
    ScrollText,
    Users,
    ShieldCheck,
    FileSignature,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import illustration1 from '../assets/rules.webp'
import illustration2 from '../assets/committee.webp'
import illustration3 from '../assets/conduct.webp'
import illustration4 from '../assets/terms.webp'

const ClubGovernance = () => {
    const [activeTab, setActiveTab] = useState(0);

    const governanceData = [
        {
            id: 0,
            title: "Basic Rules",
            icon: <ScrollText size={20} />,
            heading: "Core Club Guidelines",
            description: "ICT Club will abide by these rules, and all members are strictly required to follow them to maintain the club's integrity.",
            points: [
                "Members must belong to the ICT Department.",
                "No misuse of the club's name inside or outside campus.",
                "Zero tolerance for political activities under the club banner.",
                "Respect for college guidelines and academic excellence.",
                "Violations may lead to suspension or professional penalties."
            ],
            image: illustration1
        },
        {
            id: 1,
            title: "Committee Formation",
            icon: <Users size={20} />,
            heading: "Leadership Structure",
            description: "Our committee is formed based on merit, dedication, and past contributions to the club's activities.",
            points: [
                "Selection is based on skills, attendance, and leadership potential.",
                "Tenure for the executive committee is one academic year.",
                "Positions include President, Secretary, and Dept Heads.",
                "Transparent voting or selection process by faculty advisors.",
                "Regular performance reviews for all office bearers."
            ],
            image: illustration2
        },
        {
            id: 2,
            title: "Code of Conduct",
            icon: <ShieldCheck size={20} />,
            heading: "Team Member Etiquette",
            description: "We foster a culture of respect, collaboration, and innovation. Every member is an ambassador of the club.",
            points: [
                "Maintain professionalism in all club communications.",
                "Respect diverse opinions during brainstorming sessions.",
                "Punctuality in meetings and workshops is mandatory.",
                "Harassment or bullying of any kind is strictly prohibited.",
                "Protect club assets and intellectual property."
            ],
            image: illustration3
        },
        {
            id: 3,
            title: "Terms & Conditions",
            icon: <FileSignature size={20} />,
            heading: "Membership Agreement",
            description: "By joining the ICT Club, you agree to the following terms regarding participation and resources.",
            points: [
                "Membership fees (if any) are non-refundable.",
                "Active participation is required to receive certification.",
                "Club resources are for educational use only.",
                "The administration reserves the right to revoke membership.",
                "Photos taken during events may be used for promotion."
            ],
            image: illustration4
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-48 md:w-64 h-48 md:h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* --- Section Header --- */}
                <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
                        Governance & <span className="text-blue-600">Guidelines</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg">
                        To ensure a productive and respectful environment, we have established clear guidelines for all members and leaders.
                    </p>
                </div>

                {/* --- Interactive Tabs --- */}
                {/* Fixed: w-full and overflow handling to ensure swipe works */}
                <div className="w-full relative">
                    {/* Visual hint that there is more content (optional fade) */}
                    <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />

                    <div className="flex flex-nowrap md:flex-wrap overflow-x-auto w-full py-4 justify-start md:justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
                        {governanceData.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    flex-shrink-0 flex items-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 border whitespace-nowrap outline-none
                                    ${activeTab === item.id
                                        ? 'bg-blue-600 text-white border-blue-600 scale-105'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'}
                                `}
                            >
                                <span className={activeTab === item.id ? 'text-white' : 'text-blue-500'}>
                                    {item.icon}
                                </span>
                                <span className="font-bold text-sm md:text-base">{item.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Content Card --- */}
                <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-xl shadow-slate-200/50 p-6 md:p-12 border border-slate-100 min-h-[500px]">
                    <Transition
                        as={Fragment}
                        show={true}
                        key={activeTab}
                        appear={true}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-4"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full">

                            {/* Text Content */}
                            <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                        {governanceData[activeTab].title}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 leading-tight">
                                        {governanceData[activeTab].heading}
                                    </h3>
                                    <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                        {governanceData[activeTab].description}
                                    </p>
                                </div>

                                <ul className="space-y-3 md:space-y-4 text-left">
                                    {governanceData[activeTab].points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group">
                                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <span className="text-slate-700 font-medium text-sm md:text-base">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex justify-center lg:justify-start">
                                    <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all mt-2 group text-sm md:text-base">
                                        Read Full Document <ArrowRight size={18} className="group-hover:text-blue-700" />
                                    </button>
                                </div>
                            </div>

                            {/* Image Content */}
                            <div className="order-1 lg:order-2 relative flex justify-center items-center h-full rounded-3xl overflow-hidden p-6 md:p-8">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

                                <img
                                    src={governanceData[activeTab].image}
                                    alt={governanceData[activeTab].title}
                                    className="relative z-10 w-full max-w-xs md:max-w-md object-contain"
                                />
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </section>
    );
};

export default ClubGovernance;