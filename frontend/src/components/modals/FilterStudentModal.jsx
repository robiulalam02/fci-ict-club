import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

const FilterStudentModal = ({ isOpen, setIsOpen, filters, setFilters, resetFilters }) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[200]" onClose={() => setIsOpen(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-end p-4">
                        <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                            <Dialog.Panel className="w-full max-w-sm h-screen transform overflow-hidden bg-white p-8 shadow-2xl transition-all flex flex-col">
                                <div className="flex justify-between items-center mb-10">
                                    <Dialog.Title className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                                        <Filter size={20} className="text-blue-600" /> Filter Students
                                    </Dialog.Title>
                                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-8 flex-1">
                                    {/* Department Filter */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Department</label>
                                        <select
                                            value={filters.department}
                                            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700"
                                        >
                                            <option value="">All Departments</option>
                                            <option value="CST">Computer Science (CST)</option>
                                            <option value="TCT">Telecommunication (TCT)</option>
                                        </select>
                                    </div>

                                    {/* Course Filter */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Course Selection</label>
                                        <select
                                            value={filters.course}
                                            onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-700"
                                        >
                                            <option value="">All Courses</option>
                                            <option value="Web Design & Development">Web Design & Development</option>
                                            <option value="Computer Programming">Computer Programming</option>
                                            <option value="Graphics Design">Graphics Design</option>
                                            <option value="Cyber Security & Networking">Cyber Security & Networking</option>
                                        </select>
                                    </div>

                                    {/* Status Filter */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Verification Status</label>
                                        <div className="flex gap-2">
                                            {['pending', 'verified'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => setFilters({ ...filters, status: filters.status === status ? '' : status })}
                                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filters.status === status ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex gap-4">
                                    <button
                                        onClick={resetFilters}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        <RotateCcw size={18} /> Reset
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-4 bg-[#004274] text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FilterStudentModal;