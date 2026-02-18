import React from 'react';
import { Calendar, User, Clock, ArrowRight, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router';

const Blogs = () => {
    const dummyBlogs = [
        {
            id: 1,
            title: "Mastering React: From Beginner to Pro in 2026",
            excerpt: "Learn the core concepts of React, including hooks, state management, and the latest concurrent features released in 2026...",
            author: "Aisha Rahman",
            date: "Jan 02, 2026",
            readTime: "8 min",
            category: "Web Development",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Why Cyber Security is the Future of Tech",
            excerpt: "As we move into a more connected world, protecting data has never been more critical. Here is how you can start your journey...",
            author: "Rajiv Chowdhury",
            date: "Dec 28, 2025",
            readTime: "12 min",
            category: "Cyber Security",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "AI & Machine Learning: Trends to Watch",
            excerpt: "Artificial Intelligence is no longer sci-fi. Explore the 5 major trends that will reshape the tech industry this year...",
            author: "Fatima Akter",
            date: "Dec 22, 2025",
            readTime: "10 min",
            category: "AI & ML",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "Introduction to 5G Networking in Bangladesh",
            excerpt: "How the rollout of 5G will impact connectivity for students and professionals at Feni Computer Institute and beyond...",
            author: "Nabil Khan",
            date: "Dec 15, 2025",
            readTime: "6 min",
            category: "Networking",
            image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=800"
        },
    ];

    return (
        <section className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">

                {/* --- PAGE HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full border border-blue-100">
                            <BookOpen size={16} />
                            <span className="text-xs font-black uppercase tracking-widest">Knowledge Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
                            Latest <span className="text-blue-600">Articles</span> & Insights
                        </h1>
                        <p className="text-slate-500 max-w-lg font-medium leading-relaxed">
                            Explore technical tutorials, club news, and career advice written by the brightest minds of FCI ICT Club.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* --- BLOGS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {dummyBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow space-y-4">
                                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> {blog.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {blog.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                                    {blog.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                                    {blog.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <User size={16} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{blog.author}</span>
                                    </div>
                                    <Link
                                        to={`/blog/${blog.id}`}
                                        className="p-3 bg-slate-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                                    >
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- LOAD MORE --- */}
                <div className="mt-20 text-center">
                    <button className="px-10 py-5 bg-white border border-slate-200 text-slate-700 font-black rounded-[24px] hover:border-blue-600 hover:text-blue-600 shadow-sm transition-all active:scale-95">
                        Discover More Articles
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Blogs;