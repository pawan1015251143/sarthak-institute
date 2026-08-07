import React from 'react';
import useSEO from '../../hooks/useSEO';
import { FACULTY_LEAD, INSTITUTE_NAME } from '../../utils/constants';
import {
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  Laptop
} from 'lucide-react';

const About = () => {
  useSEO({
    title: 'About Us',
    description: 'Learn about Sarthak Institute, our mission, vision, and the legacy of Rakesh Sir in transforming education in Lalganj, Bihar.',
    path: '/about'
  });

  const facultyTeam = [FACULTY_LEAD];

  const whyChooseUs = [
    {
      title: "Concept-Driven Approach",
      desc: "No rote learning. We break down complex Physics & Chemistry topics into simple, relatable concepts.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Sole Expert Faculty",
      desc: "Learn directly from Rakesh Sir, ensuring consistent quality and mentoring for every student.",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Weekly Mock Tests",
      desc: "OMR-based and subjective mock tests to build exam temperament and time management skills.",
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      title: "Smart Digital Classes",
      desc: "Interactive learning with visual aids, digital board explanations, and PDF notes for revision.",
      icon: <Laptop className="w-6 h-6" />
    }
  ];

  const timeline = [
    {
      year: "2017",
      title: "Foundation Stone Laid",
      desc: "Sarthak Institute was established in Lalganj, Bihar with a vision to provide premium coaching to local students."
    },
    {
      year: "2019",
      title: "First State Topper",
      desc: "Achieved our first major milestone as our students secured top ranks in the Bihar Board 10th and 12th exams."
    },
    {
      year: "2021",
      title: "Digital Expansion",
      desc: "Launched our YouTube channel to provide free, high-quality video lectures, reaching students across Bihar."
    },
    {
      year: "2024",
      title: "2.5M+ Views & Growing",
      desc: "Crossed 2.5 million views on YouTube, helping thousands of students achieve 95%+ marks purely on concepts."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Detailed About Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-extrabold uppercase tracking-widest">
          <MapPin className="w-4 h-4" />
          Lalganj, Bihar
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.2]">
          Welcome to <span className="text-primary-600 dark:text-primary-400">Sarthak Institute</span>
        </h1>
        <div className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed space-y-4">
          <p>
            Established with a singular goal to eradicate the fear of Board Exams, Sarthak Institute has become the most trusted name in Lalganj, Bihar for <strong>Class 10th (All Subjects)</strong> and <strong>11th-12th (Physics &amp; Chemistry)</strong>.
          </p>
          <p>
            We believe that true education goes beyond textbooks. Our motto <strong className="text-slate-900 dark:text-white">"Ratne Se Mukti, Concept Se Safalta"</strong> drives our teaching methodology. Instead of forcing students to memorize formulas, we focus on deep conceptual clarity, interactive doubt-solving, and rigorous testing to prepare them for both board exams and future competitive challenges.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 text-slate-100 dark:text-slate-800/50 group-hover:scale-110 transition-transform duration-500">
            <Target className="w-40 h-40" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              To provide highly accessible, conceptual, and result-oriented coaching. We aim to empower every student in Bihar, regardless of their background, with the knowledge and confidence required to score 95%+ marks in their board examinations.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 text-slate-100 dark:text-slate-800/50 group-hover:scale-110 transition-transform duration-500">
            <Eye className="w-40 h-40" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              To be the premier educational institution in Bihar that revolutionizes traditional rote learning. We envision a future where every student understands the 'Why' behind every concept, building a strong foundation for lifelong success.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Why Choose Sarthak Institute?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg">
            What makes us the #1 choice for board exam preparation in Lalganj.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="glass-card p-6 space-y-4 hover:border-primary-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Institute Journey (Timeline) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            Our Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            The Journey of Success
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[15px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
          
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col sm:flex-row items-start ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-8`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[15px] sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-4 border-primary-500 z-10 shadow-lg" />
                
                {/* Content Box */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${idx % 2 === 0 ? 'sm:text-left sm:pl-10' : 'sm:text-right sm:pr-10'}`}>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 text-sm font-bold rounded-lg mb-3">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Spotlight (Kept for continuity) */}
      <div className="glass-card p-8 sm:p-12 border-t-4 border-t-yellow-400">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <img
              src={FACULTY_LEAD.photo}
              alt={FACULTY_LEAD.name}
              className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="lg:col-span-8 space-y-5">
            <span className="badge-primary">Founder's Message</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {FACULTY_LEAD.name}
            </h2>
            <div className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
              {FACULTY_LEAD.role} — {FACULTY_LEAD.qualification}
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg italic border-l-4 border-slate-300 dark:border-slate-700 pl-4">
              “When we started Sarthak Institute, our goal was simple: eradicate the fear of Science and Math from students' minds. Today, our students consistently rank at the top of board examinations because we prioritize deep conceptual clarity over rote memorization.”
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              {FACULTY_LEAD.stats.map((st, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {st.value}
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
