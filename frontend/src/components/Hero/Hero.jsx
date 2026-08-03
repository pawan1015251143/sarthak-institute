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
  Play,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { FACULTY_LEAD, INSTITUTE_PHONE } from '../../utils/constants';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 text-white border-b border-blue-900/40">
      {/* Background Glows & Accent Lights (Motion Kota Style) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Col: High Impact Motion Style Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Admissions Open Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>Admissions Open 2026–27 • Bihar Board 10th &amp; 11th-12th (Phy &amp; Che)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Ratne Se Mukti,{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Concept Se Safalta
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <strong className="text-yellow-400">Bihar Board 10th (All Subjects)</strong> aur <strong className="text-yellow-400">11th-12th (Physics &amp; Chemistry)</strong> ke liye <strong className="text-white">Rakesh Sir</strong> dwara sabse behtareen aur conceptual margdarshan. Aasan Hindi w English medium me seekhe aur board exams me <strong className="text-yellow-400">95%+ marks</strong> laye!
            </p>

            {/* CTAs (Motion Kota Style Golden Yellow + WhatsApp Green) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-yellow-500/25 active:scale-95 transition-all text-base"
              >
                <span>Explore Courses &amp; Fee</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/919006859138?text=Hello%20Rakesh%20Sir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all text-base"
              >
                <span>💬 WhatsApp Enquiry</span>
              </a>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-blue-400/40 hover:border-yellow-400 text-blue-200 hover:text-yellow-300 font-semibold rounded-xl transition-all text-base"
              >
                <span>Student Portal</span>
              </Link>
            </div>

            {/* Motion Style Highlights Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-900/60">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-800/40">
                <div className="text-2xl lg:text-3xl font-extrabold text-yellow-400">
                  25 Lakh+
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                  YouTube Views
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-800/40">
                <div className="text-2xl lg:text-3xl font-extrabold text-white">
                  866+
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                  Free Video Lectures
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-800/40">
                <div className="text-2xl lg:text-3xl font-extrabold text-amber-300">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                  Concept Focused
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Motion Kota Master Mentor Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Premium Founder Card Styled like Motion Kota Banner */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-500/30 bg-gradient-to-b from-slate-900 to-blue-950 p-6 relative group">
                {/* Top Ribbons */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                    Sole Expert Faculty
                  </span>
                  <span className="text-xs font-semibold text-blue-300">
                    15+ Years Exp.
                  </span>
                </div>

                <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden mb-5 border border-blue-800/60 bg-slate-950 shadow-inner">
                  <img
                    src={FACULTY_LEAD.photo}
                    alt={FACULTY_LEAD.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs uppercase font-extrabold tracking-widest text-yellow-400 mb-1">
                      Founder &amp; Lead Mentor
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">
                      {FACULTY_LEAD.name}
                    </h3>
                    <p className="text-xs text-blue-200 mt-1 font-medium">
                      {FACULTY_LEAD.role} — {FACULTY_LEAD.qualification}
                    </p>
                  </div>
                </div>

                {/* Micro Stats inside Card */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-900/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-bold">
                      ★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Concept Clarity</div>
                      <div className="text-[10px] text-slate-400">No Rote Learning</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Daily Practice</div>
                      <div className="text-[10px] text-slate-400">Objective &amp; Notes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Pill */}
              <div className="absolute -bottom-5 -right-4 hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl bg-yellow-400 text-slate-950 font-extrabold shadow-xl border border-yellow-300">
                <Award className="w-6 h-6 text-slate-950" />
                <div>
                  <div className="text-xs uppercase tracking-wider">Ek Hi Sir Jo Banate Hain</div>
                  <div className="text-sm">Concept Aasan</div>
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
