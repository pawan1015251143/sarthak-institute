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
    <div className="glass-card-hover flex flex-col justify-between p-6 h-full relative overflow-hidden group">
      {/* Badge */}
      {course.badge && (
        <div className="absolute top-4 right-4 badge-primary">
          {course.badge}
        </div>
      )}

      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary-500/25">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-primary-600 dark:text-primary-400 uppercase tracking-wider block">
              {course.classLevel} • {course.stream}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 line-clamp-3">
          {course.description}
        </p>

        {/* Subjects list */}
        <div className="mb-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Subjects Covered:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.subjects.map((sub, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Duration & Faculty */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary-500" />
            <span>{course.faculty.length} Expert Teachers</span>
          </div>
        </div>
      </div>

      {/* Fee & Action */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="text-xs text-slate-500 font-semibold">Monthly Fee</div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(course.feeMonthly)}
            <span className="text-xs font-normal text-slate-500">/mo</span>
          </div>
        </div>

        <button
          onClick={() => onAdmissionClick && onAdmissionClick(course)}
          className="btn-primary py-2 px-4 text-xs font-bold shadow-sm"
        >
          <span>Admission</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
