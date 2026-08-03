import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Atom,
  TrendingUp,
  Award,
  Briefcase,
  Globe,
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const iconMap = {
  GraduationCap: GraduationCap,
  Atom: Atom,
  TrendingUp: TrendingUp,
  BookOpen: BookOpen,
  Award: Award,
  Briefcase: Briefcase,
  Globe: Globe,
};

const CourseCard = ({ course, onAdmissionClick }) => {
  const IconComponent = iconMap[course.icon] || GraduationCap;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-4 border-t-yellow-400 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6 h-full relative overflow-hidden group">
      {/* Badge Ribbon */}
      {course.badge && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-yellow-400/15 border border-yellow-400/50 text-amber-700 dark:text-yellow-300">
          ★ {course.badge}
        </div>
      )}

      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-yellow-400 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {course.classLevel} • {course.stream}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 line-clamp-3 font-normal">
          {course.description}
        </p>

        {/* Subjects list */}
        <div className="mb-5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Subjects Covered:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.subjects.map((sub, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-200 border border-blue-200/50 dark:border-slate-700"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Duration & Faculty */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-800 mb-4 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-900 dark:text-white">By Rakesh Sir</span>
          </div>
        </div>
      </div>

      {/* Fee & Action (Motion Kota Yellow CTA button) */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="text-[11px] text-slate-500 font-bold uppercase">Monthly Fee</div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatCurrency(course.feeMonthly)}
            <span className="text-xs font-normal text-slate-500">/mo</span>
          </div>
        </div>

        <button
          onClick={() => onAdmissionClick && onAdmissionClick(course)}
          className="inline-flex items-center gap-1.5 py-2.5 px-5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md shadow-yellow-500/20 active:scale-95 transition-all"
        >
          <span>Enroll / Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
