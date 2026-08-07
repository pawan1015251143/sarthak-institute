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
  PhoneCall,
  Video
} from 'lucide-react';
import { FACULTY_LEAD, INSTITUTE_PHONE } from '../../utils/constants';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24 text-white border-b border-slate-800">
      {/* Premium Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
          alt="Sarthak Institute Lalganj Campus Background"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        {/* Deep dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Decorative Lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Col: High Impact Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Admissions Open Pill Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm text-center backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse shrink-0" />
              <span className="leading-tight">Admissions Open 2026–27 • Bihar Board 10th &amp; 11th-12th</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-white">
              Sarthak Institute <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
                Lalganj
              </span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mt-4">
              Ratne Se Mukti, Concept Se Safalta
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium mt-4">
              Join Vaishali, Bihar's most trusted institute for <strong className="text-yellow-400">Class 10th (All Subjects)</strong> and <strong className="text-yellow-400">11th-12th (Physics &amp; Chemistry)</strong>. 
              Get expertly crafted notes, regular mock tests, and personal mentoring to achieve <strong className="text-white">95%+ in Board Exams</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/fee-structure"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-yellow-500/25 active:scale-95 transition-all text-base"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300/30 hover:border-white bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-sm text-white font-bold rounded-xl transition-all text-base"
              >
                <Video className="w-5 h-5" />
                <span>Free Demo Class</span>
              </Link>

              <a
                href="https://wa.me/919006859138?text=Hello%20Rakesh%20Sir,%20I%20want%20to%20know%20about%20admission."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1fbc5b] text-white font-bold rounded-xl shadow-lg shadow-[#25D366]/30 active:scale-95 transition-all text-base"
              >
                <MessageCircleIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Phone Number Banner */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 text-slate-300 font-semibold">
              <PhoneCall className="w-4 h-4 text-primary-400" />
              <span>Helpline / Admission Support: <a href={`tel:${INSTITUTE_PHONE}`} className="text-white font-bold hover:text-primary-400 hover:underline">{INSTITUTE_PHONE}</a></span>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-700/60 text-center sm:text-left">
              <div className="p-3 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50">
                <div className="text-2xl lg:text-3xl font-extrabold text-yellow-400">
                  25 Lakh+
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  YouTube Views
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50">
                <div className="text-2xl lg:text-3xl font-extrabold text-white">
                  866+
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  Video Lectures
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50">
                <div className="text-2xl lg:text-3xl font-extrabold text-amber-300">
                  100%
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  Concept Focused
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Mentor Showcase Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl p-6 relative group">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                    Sole Expert Faculty
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    15+ Years Exp.
                  </span>
                </div>

                <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden mb-5 border border-slate-700/60 bg-slate-950 shadow-inner">
                  <img
                    src={FACULTY_LEAD.photo}
                    alt={`Rakesh Sir - ${FACULTY_LEAD.name} at Sarthak Institute Lalganj`}
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
                    <p className="text-xs text-slate-300 mt-1 font-medium">
                      {FACULTY_LEAD.role} — {FACULTY_LEAD.qualification}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/60">
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

// Extracted from Lucide since it wasn't imported above
function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export default Hero;
