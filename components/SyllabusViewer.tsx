
import React, { useState, useMemo } from 'react';
import { ACADEMIC_SYLLABUS, ELECTIVES_DATA } from '../data';
import { Book, GraduationCap, Search, Calendar, ChevronRight, Download, Clock, ExternalLink } from 'lucide-react';
import { SyllabusCourse } from '../types';
import SyllabusModal from './SyllabusModal';

const SyllabusViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'semesters' | 'electives'>('semesters');
  const [activeSemesterId, setActiveSemesterId] = useState<string>("1-1");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Replace expanded code with selected course for Modal
  const [selectedCourse, setSelectedCourse] = useState<SyllabusCourse | null>(null);

  const selectedSemester = useMemo(() => 
    ACADEMIC_SYLLABUS.find(sem => sem.id === activeSemesterId), 
  [activeSemesterId]);

  // Filter functionality for semesters
  const filteredCourses = useMemo(() => {
    if (!selectedSemester) return [];
    if (!searchTerm) return selectedSemester.courses;
    
    return selectedSemester.courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedSemester, searchTerm]);

  // Filter functionality for electives
  const filteredElectives = useMemo(() => {
    if (!searchTerm) return ELECTIVES_DATA;
    return ELECTIVES_DATA.map(group => ({
      ...group,
      courses: group.courses.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.courses.length > 0);
  }, [searchTerm]);

  return (
    <div id="syllabus-section" className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-lg rounded-2xl p-4 md:p-6 transition-all duration-300 w-full animate-slide-up mt-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="text-emerald-600 dark:text-emerald-400" size={24} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Syllabus</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            JNTUH R25 Regulations • B.Tech CSE (AI & ML)
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search course code or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 rounded-lg pl-10 pr-4 py-2 text-sm outline-none transition-all text-slate-800 dark:text-slate-200"
            />
          </div>
          
          <button className="hidden md:flex items-center justify-center p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" title="Download Syllabus">
             <Download size={20} />
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        <button
          onClick={() => setActiveTab('semesters')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'semesters' 
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Calendar size={16} />
          Semester Schedule
        </button>
        <button
          onClick={() => setActiveTab('electives')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'electives' 
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Book size={16} />
          Electives List
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'semesters' ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Semester Selector Sidebar */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 lg:w-48 shrink-0 no-scrollbar">
            {ACADEMIC_SYLLABUS.map((sem) => (
              <button
                key={sem.id}
                onClick={() => setActiveSemesterId(sem.id)}
                className={`flex items-center justify-between p-3 rounded-xl text-left transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${
                  activeSemesterId === sem.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="font-semibold text-xs md:text-sm">{sem.title}</span>
                {activeSemesterId === sem.id && <ChevronRight size={16} className="hidden lg:block" />}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-hidden">
            {selectedSemester && (
              <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-white/5 overflow-hidden">
                
                {/* --- DESKTOP VIEW (Table) --- */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 dark:bg-slate-800/80 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                        <th className="p-4 w-12 text-center">#</th>
                        <th className="p-4 w-24">Code</th>
                        <th className="p-4">Course Title</th>
                        <th className="p-4 text-center w-16" title="Lecture Hours">L</th>
                        <th className="p-4 text-center w-16" title="Tutorial Hours">T</th>
                        <th className="p-4 text-center w-16" title="Practical Hours">P</th>
                        <th className="p-4 text-center w-20">Credits</th>
                        <th className="p-4 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50 dark:divide-white/5 text-sm">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <tr 
                            key={course.code}
                            onClick={() => setSelectedCourse(course)}
                            className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 cursor-pointer transition-colors group"
                          >
                            <td className="p-4 text-slate-500 text-center">{course.sNo}</td>
                            <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400 font-medium">{course.code}</td>
                            <td className="p-4 font-medium text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                              {course.title}
                            </td>
                            <td className="p-4 text-center text-slate-500">{course.l}</td>
                            <td className="p-4 text-center text-slate-500">{course.t}</td>
                            <td className="p-4 text-center text-slate-500">{course.p}</td>
                            <td className="p-4 text-center">
                              <span className="inline-block w-8 h-8 leading-8 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white">
                                {course.credits}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink size={16} />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-500">
                            No courses found matching "{searchTerm}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                    {/* Footer Totals */}
                    <tfoot>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 font-bold border-t border-slate-200 dark:border-white/10">
                        <td colSpan={3} className="p-4 text-right text-slate-600 dark:text-slate-300">Total Credits</td>
                        <td colSpan={3}></td>
                        <td className="p-4 text-center text-emerald-600 dark:text-emerald-400 text-base">
                          {selectedSemester.totalCredits}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* --- MOBILE VIEW (Cards) --- */}
                <div className="block md:hidden">
                  <div className="flex flex-col divide-y divide-slate-200/50 dark:divide-white/5">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <div 
                          key={course.code} 
                          onClick={() => setSelectedCourse(course)}
                          className="p-4 bg-white/50 dark:bg-slate-900/50 active:bg-slate-100 dark:active:bg-slate-800 transition-colors cursor-pointer group"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                                  {course.code}
                                </span>
                                <span className="text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                                  {course.credits} Credits
                                </span>
                              </div>
                              <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {course.title}
                              </h3>
                            </div>
                            <ExternalLink size={18} className="text-slate-300 mt-1" />
                          </div>

                          <div className="flex gap-4 mt-3 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-blue-500" />
                              <span><strong className="text-slate-900 dark:text-white">{course.l}</strong> L</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-purple-500" />
                              <span><strong className="text-slate-900 dark:text-white">{course.t}</strong> T</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-orange-500" />
                              <span><strong className="text-slate-900 dark:text-white">{course.p}</strong> P</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        No courses found matching "{searchTerm}"
                      </div>
                    )}
                  </div>
                  {/* Mobile Footer Total */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600 dark:text-slate-300">Total Credits</span>
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                      {selectedSemester.totalCredits}
                    </span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      ) : (
        // Electives View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElectives.length > 0 ? (
            filteredElectives.map((group, idx) => (
              <div key={idx} className="bg-white/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/5 p-5 hover:border-emerald-500/30 transition-colors">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.courses.map(course => (
                    <li key={course.code} className="flex items-start gap-3 text-sm">
                      <span className="font-mono text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 shrink-0 mt-0.5">
                        {course.code}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 leading-snug">{course.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
             <div className="col-span-full py-12 text-center text-slate-500">
                No electives found matching "{searchTerm}"
             </div>
          )}
        </div>
      )}

      {/* Syllabus Pop-out Modal */}
      {selectedCourse && (
        <SyllabusModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default SyllabusViewer;