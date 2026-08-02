import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import YouTubeSpotlight from '../../components/YouTubeSpotlight/YouTubeSpotlight';
import CourseCard from '../../components/Cards/CourseCard';
import Modal from '../../components/Modal/Modal';
import {
  COURSES_DATA,
  FACULTY_LEAD,
  TESTIMONIALS_DATA,
  ACHIEVEMENTS_DATA,
  NOTICE_BOARD_DATA,
  GALLERY_PREVIEW_DATA,
  INSTITUTE_PHONE,
} from '../../utils/constants';
import {
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  Trophy,
  Sparkles,
  Bell,
  Star,
  MapPin,
  PhoneCall,
  Calendar,
} from 'lucide-react';

const Home = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleAdmissionClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="space-y-20 md:space-y-28 pb-24">
      {/* 1. Hero Section & Admissions Open Banner */}
      <Hero />

      {/* 2. YouTube Channel Spotlight (@sarthakinstitute6303) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <YouTubeSpotlight />
      </div>

      {/* 3. Why Choose Sarthak Institute */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 dark:text-white mt-2">
            Built on Rigor, Mentored by Experts
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base">
            We don't just teach the syllabus — we develop mathematical intuition, scientific temperament, and exam-cracking confidence for Class 10, 11 &amp; 12.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 flex flex-col justify-between hover:border-primary-500/40 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Courses Offered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              COURSES OFFERED
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 dark:text-white mt-2">
              Structured Batches for Every Academic Goal
            </h2>
          </div>
          <Link
            to="/courses"
            className="btn-outline self-start md:self-auto text-sm py-2 px-4"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES_DATA.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onAdmissionClick={handleAdmissionClick}
            />
          ))}
        </div>
      </section>

      {/* 4. Rakesh Sir Profile (Founder & Lead Mentor) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <div className="relative mx-auto max-w-xs lg:max-w-none">
                <img
                  src={FACULTY_LEAD.photo}
                  alt={FACULTY_LEAD.name}
                  className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-4 left-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="font-extrabold text-slate-900 dark:text-white text-base">
                    {FACULTY_LEAD.name}
                  </div>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                    {FACULTY_LEAD.role}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                  FOUNDER &amp; MENTORSHIP
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 dark:text-white mt-2">
                  Rakesh Yadav Sir — Ek Hi Sir Jo Banate Hain Concept Aasan
                </h2>
                <div className="text-sm font-semibold text-secondary-600 dark:text-secondary-400 mt-1">
                  {FACULTY_LEAD.qualification} • {FACULTY_LEAD.experience}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {FACULTY_LEAD.bio}
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                {FACULTY_LEAD.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/about" className="btn-primary text-sm">
                  <span>Rakesh Sir ke baare me jaane</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.youtube.com/@sarthakinstitute6303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm border-red-500/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <span>🔴 Watch on YouTube (866+ Videos)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Student Achievements & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            STUDENT ACHIEVEMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 dark:text-white mt-2">
            Hear From Our Board &amp; Competitive Toppers
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base">
            Real stories from Sarthak Institute students who achieved exceptional marks in Class 10, 11 &amp; 12.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="glass-card p-6 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center gap-1 text-secondary-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm italic mb-6 leading-relaxed">
                  “{t.text}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                    {t.classLevel}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-secondary-600 dark:text-secondary-400">
                    {t.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Institute Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              CAMPUS GALLERY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 dark:text-white mt-2">
              Life inside Sarthak Institute
            </h2>
          </div>
          <Link
            to="/gallery"
            className="btn-outline self-start md:self-auto text-sm py-2 px-4"
          >
            <span>Explore Complete Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PREVIEW_DATA.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="glass-card-hover overflow-hidden group relative aspect-[16/10]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-400">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold truncate">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Notice Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 dark:text-white">
                  Institute Notice Board
                </h3>
                <p className="text-xs text-slate-500">
                  Latest schedules, examinations, and academic circulars
                </p>
              </div>
            </div>
            <Link to="/notices" className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline">
              View All Notices &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NOTICE_BOARD_DATA.slice(0, 2).map((notice) => (
              <div
                key={notice.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-300">
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.date}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {notice.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Section & Admissions Hotline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 via-indigo-700 to-primary-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold tracking-widest text-secondary-300 uppercase">
                ENROLL FOR ACADEMIC SESSION 2026–27
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-extrabold leading-tight">
                Ready to Secure Your Seat at Sarthak Institute?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-xl">
                Contact our admission counselors today for a free career guidance consultation and scholarship assessment test.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                to="/fee-structure"
                className="btn-secondary text-center font-extrabold"
              >
                <span>View Fee Structure</span>
              </Link>
              <a
                href={`tel:${INSTITUTE_PHONE}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Admissions: {INSTITUTE_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title="Admission Inquiry & Enrollment"
      >
        {selectedCourse && (
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60">
              <div className="text-xs font-bold uppercase text-primary-600 dark:text-primary-400">
                Selected Course
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedCourse.title}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {selectedCourse.duration} • Monthly Fee: ₹{selectedCourse.feeMonthly}
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              To complete admission for <strong>{selectedCourse.title}</strong>, you can either proceed with online fee payment or visit our campus counseling office.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to="/fee-structure"
                className="btn-primary flex-1 text-center"
              >
                <span>Proceed to Online Payment</span>
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

export default Home;
