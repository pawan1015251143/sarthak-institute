import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32 bg-gradient-to-b from-primary-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Col: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Admissions Open Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-300 text-sm font-semibold shadow-sm animate-pulse-soft">
              <Sparkles className="w-4 h-4 text-secondary-500" />
              <span>Admissions Open for Session 2026–27 • Bihar Board 10th | 11th-12th (Phy &amp; Che)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Sarthak Institute:{' '}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-secondary-500 bg-clip-text text-transparent">
                Rakesh Sir
              </span>{' '}
              ke saath Safalta ki Guarantee
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Bihar Board 10th (All Subjects)</strong> aur <strong className="text-slate-900 dark:text-white">11th-12th (Physics &amp; Chemistry)</strong> ke liye ek hi Sir dwara sabse behtareen aur conceptual margdarshan. Ratne ki zaroorat nahi, har topic aasan Hindi w English medium me seekhe!
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/courses" className="btn-primary w-full sm:w-auto text-base">
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919006859138?text=Hello%20Rakesh%20Yadav%20Sir"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-base !bg-emerald-600 !from-emerald-600 !to-green-700 !text-white !shadow-emerald-600/30"
              >
                <span>💬 WhatsApp (9006859138)</span>
              </a>
              <Link to="/login" className="btn-outline w-full sm:w-auto text-base">
                <span>Student Login Portal</span>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
                  12,000+
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Students Mentored
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                  95%+
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Board Scorers (1,500+)
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-secondary-600 dark:text-secondary-400">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Success Ratio
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Hero Visual / Glass Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 aspect-[4/3] relative group">
                <img
                  src="https://i.ytimg.com/vi/oHZ0CeUt7AY/hqdefault.jpg"
                  alt="Smart Classroom at Sarthak Institute"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-bold text-lg">
                    Smart Classrooms &amp; Online Portal
                  </div>
                  <p className="text-slate-300 text-xs">
                    Bihar Board 10th (All Subjects) • 11th-12th (Physics &amp; Chemistry)
                  </p>
                </div>
              </div>

              {/* Floating Glass Card - Top Right */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-slate-200 dark:border-slate-700 animate-float">
                <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    48 State Toppers
                  </div>
                  <div className="text-xs text-slate-500">
                    CBSE &amp; State Boards
                  </div>
                </div>
              </div>

              {/* Floating Glass Card - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="w-11 h-11 rounded-xl bg-secondary-100 dark:bg-secondary-950/80 text-secondary-600 dark:text-secondary-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Online Test Series
                  </div>
                  <div className="text-xs text-slate-500">
                    Instant MCQ Score &amp; Rank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
