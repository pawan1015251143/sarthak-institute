import React, { useState } from 'react';
import useSEO from '../../hooks/useSEO';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/Cards/CourseCard';
import Modal from '../../components/Modal/Modal';
import { COURSES_DATA } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import {
  GraduationCap,
  Atom,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';

const Courses = () => {
  useSEO({
    title: 'Courses',
    description: 'Explore our comprehensive courses for Class 10 (All Subjects), Class 11 & 12 (Physics & Chemistry) with expertly crafted study material.',
    path: '/courses'
  });

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filterTabs = ['All', 'Class 10', 'Class 11', 'Class 12'];

  const filteredCourses =
    selectedClass === 'All'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.classLevel === selectedClass);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          ACADEMIC PROGRAMS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Explore Our Courses for Class 10, 11 &amp; 12
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base">
          Each batch is designed with comprehensive subject coverage, interactive notes, online MCQ test series, and dedicated mentoring.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedClass(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              selectedClass === tab
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onAdmissionClick={(c) => setSelectedCourse(c)}
          />
        ))}
      </div>

      {/* Admission Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title="Admission Enrollment & Fee Inquiry"
      >
        {selectedCourse && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60">
              <div className="text-xs font-bold uppercase text-primary-600 dark:text-primary-400">
                Course Selected
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedCourse.title}
              </h3>
              <div className="text-xs text-slate-500 mt-1">
                {selectedCourse.classLevel} • {selectedCourse.stream} • {selectedCourse.duration}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Subjects Included:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.subjects.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-sm">
              <div>
                <div className="text-xs text-slate-500">Monthly Installment</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatCurrency(selectedCourse.feeMonthly)}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Yearly Full Fee</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatCurrency(selectedCourse.feeYearly)}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/fee-structure"
                className="btn-primary flex-1 text-center"
              >
                <span>Proceed to Pay Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline flex-1 text-center"
              >
                <span>Contact Counselor</span>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Courses;
