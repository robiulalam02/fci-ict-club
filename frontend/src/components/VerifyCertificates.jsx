import React, { useState } from 'react';
import { Search, ShieldCheck, User, Calendar, Award, Download, AlertCircle, ExternalLink } from 'lucide-react';

const VerifyCertificates = () => {
    const [searchInput, setSearchInput] = useState('');
    const [faculty, setFaculty] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        setResults(null); 

        try {
            // konstrukt the URL with search query and faculty
            const response = await fetch(
                `https://fci-ict-club-server.vercel.app/api/verify?search=${encodeURIComponent(searchInput)}&faculty=${encodeURIComponent(faculty)}`
            );
            const data = await response.json();

            if (response.ok) {
                // Ensure results is an array even if one object is returned
                setResults(Array.isArray(data) ? data : [data]);
            } else {
                setResults("not-found");
            }
        } catch (error) {
            console.error("Verification failed:", error);
            alert("Could not connect to the server. Please check if the backend is running.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#004274] mb-4">
                        Certificate Verification
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Search by Name or Validation Number within your specific faculty to verify authenticity.
                    </p>
                </div>

                {/* Unified Search Bar */}
                <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 mb-10">
                    <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-2">
                        <div className="relative flex-[2]">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Enter Name or Validation ID"
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium"
                                required
                            />
                        </div>

                        <select 
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                            className="flex-1 px-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium text-gray-700"
                            required
                        >
                            <option value="">Select Faculty</option>
                            <option value="Web Design & Development">Web Design & Development</option>
                            <option value="Computer Programming">Computer Programming</option>
                            <option value="Graphics Design">Graphics Design</option>
                            <option value="Cyber Security & Networking">Cyber Security & Networking</option>
                            <option value="Power & Circuit Course">Power & Circuit Course</option>
                        </select>

                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-[#004274] hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 disabled:bg-slate-400 flex items-center justify-center gap-2"
                        >
                            {isSearching ? "Searching..." : "Verify Now"}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="space-y-8 transition-all duration-500">
                    {results === "not-found" && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl flex items-center gap-4 animate-shake">
                            <AlertCircle className="text-red-500 shrink-0" size={32} />
                            <div>
                                <h4 className="text-red-800 font-bold">No Records Found</h4>
                                <p className="text-red-600 text-sm">We couldn't find any certificate matching "{searchInput}" in {faculty}.</p>
                            </div>
                        </div>
                    )}

                    {Array.isArray(results) && results.map((cert, index) => (
                        <div key={index} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            {/* Certificate Banner (Original Style) */}
                            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={28} className="text-cyan-200" />
                                    <span className="font-bold tracking-widest uppercase text-sm">Official Verification Result</span>
                                </div>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                                    ID: {cert.validationId}
                                </span>
                            </div>

                            {/* Certificate Details Grid (Original Style) */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><User size={20} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Student Name</p>
                                            <p className="text-xl font-bold text-gray-800">{cert.studentName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Award size={20} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Course Title</p>
                                            <p className="text-xl font-bold text-gray-800">{cert.courseTitle}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Calendar size={20} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Issue Date</p>
                                            <p className="text-xl font-bold text-gray-800">{cert.issueDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-green-50 rounded-lg text-green-600"><ShieldCheck size={20} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Status</p>
                                            <p className="text-xl font-bold text-green-600 flex items-center gap-2">
                                                {cert.status || "Verified"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer (Original Style) */}
                            <div className="bg-slate-50 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
                                <p className="text-sm text-gray-500 text-center sm:text-left">
                                    This is a digitally verified document issued by <strong>FCI ICT Club</strong>.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a 
                                        href={cert.pdfLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-700 transition-colors text-sm"
                                    >
                                        <ExternalLink size={18} /> View PDF
                                    </a>
                                    <a 
                                        href={cert.pdfLink} 
                                        target="_blank" 
                                        className="flex items-center gap-2 bg-[#004274] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md"
                                    >
                                        <Download size={18} /> Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VerifyCertificates;