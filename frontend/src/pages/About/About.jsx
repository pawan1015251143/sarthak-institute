import React from 'react';
import { FACULTY_LEAD, INSTITUTE_NAME } from '../../utils/constants';
import {
  GraduationCap,
  Award,
  Users,
  Target,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const About = () => {
  const facultyTeam = [FACULTY_LEAD];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          ABOUT SARTHAK INSTITUTE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Bihar Board 10th (All Subjects) aur 11th - 12th (Physics &amp; Chemistry)
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base leading-relaxed">
          Sarthak Institute ka ek hi uddeshya hai: Har student ko ratne ke bajay concept samjhana aur board exam me 1st Division w 95%+ marks dilana.
        </p>
      </div>

      {/* Founder & Lead Mentor Spotlight */}
      <div className="glass-card p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <img
              src={FACULTY_LEAD.photo}
              alt={FACULTY_LEAD.name}
              className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <span className="badge-primary">Founder's Message</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {FACULTY_LEAD.name}
            </h2>
            <div className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
              {FACULTY_LEAD.role} — {FACULTY_LEAD.qualification}
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              “When we started Sarthak Institute, our goal was simple: eradicate the fear of Mathematics and Science from students' minds. Today, our students consistently rank at the top of CBSE and State board examinations because we prioritize deep conceptual clarity over rote memorization.”
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              {FACULTY_LEAD.stats.map((st, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {st.value}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Mission
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            To provide accessible, high-quality coaching with computerized testing, instant feedback, and dedicated mentor support for every individual student.
          </p>
        </div>

        <div className="glass-card p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-50 dark:bg-secondary-950 text-secondary-600 dark:text-secondary-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Excellence
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Over 1,500 students with 95%+ in Board Exams and consistent top ranks across Science, Commerce, and Arts streams.
          </p>
        </div>

        <div className="glass-card p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Student-Centric Care
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Small batch sizes, one-on-one doubt clearing sessions, and interactive parent-teacher progress reviews.
          </p>
        </div>
      </div>

      {/* Faculty Roster */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            OUR FACULTY
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            Meet Our Senior Educators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyTeam.map((mem, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <img
                  src={mem.photo}
                  alt={mem.name}
                  className="w-24 h-24 rounded-2xl object-cover mb-4 shadow-md"
                />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {mem.name}
                </h3>
                <div className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {mem.role}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {mem.bio}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 pt-3 border-t border-slate-200 dark:border-slate-800">
                {mem.qualification} • {mem.experience}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
