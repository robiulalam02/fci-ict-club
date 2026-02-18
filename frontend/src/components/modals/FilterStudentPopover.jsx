import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';

const FilterStudentPopover = ({ filters, setFilters, resetFilters }) => {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button className={`flex items-center gap-2 p-2.5 border rounded-2xl transition-all outline-none ${(filters.department || filters.course || filters.status) ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <Filter size={20} />
                        <span className="text-sm font-bold hidden md:block">Filter</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                    </Popover.Button>

                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                        <Popover.Panel className="absolute right-0 z-50 mt-3 w-80 origin-top-right rounded-[32px] bg-white p-6 shadow-2xl ring-1 ring-slate-200 focus:outline-none">
                            <div className="space-y-5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Advanced Filtering</p>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Department</label>
                                    <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 outline-none">
                                        <option value="">All Departments</option>
                                        <option value="CST">CST (Computer)</option>
                                        <option value="TCT">TCT (Telecom)</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Course</label>
                                    <select value={filters.course} onChange={(e) => setFilters({ ...filters, course: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 outline-none">
                                        <option value="">All Courses</option>
                                        <option value="Web Design & Development">Web Design</option>
                                        <option value="Computer Programming">Programming</option>
                                        <option value="Graphics Design">Graphics</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Status</label>
                                    <div className="flex gap-2">
                                        {['pending', 'verified'].map((s) => (
                                            <button key={s} onClick={() => setFilters({ ...filters, status: filters.status === s ? '' : s })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filters.status === s ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <button onClick={resetFilters} className="flex items-center gap-1 text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest transition-colors"><RotateCcw size={14} /> Clear</button>
                                    <Popover.Button className="bg-[#004274] text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all">Apply</Popover.Button>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default FilterStudentPopover;