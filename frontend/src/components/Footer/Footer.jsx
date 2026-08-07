import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  MessageCircle,
  Bookmark,
  ArrowRight,
} from 'lucide-react';
import {
  INSTITUTE_NAME,
  INSTITUTE_PHONE,
  INSTITUTE_EMAIL,
  INSTITUTE_ADDRESS,
} from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center">
                <img src="/logo.jpg" alt="Sarthak Institute Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-2xl font-serif font-black tracking-tight text-white">
                  {INSTITUTE_NAME}
                </span>
                <span className="text-xs block font-bold tracking-widest text-secondary-400 uppercase">
                  Learn • Grow • Succeed
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Central India’s premier coaching institution delivering academic excellence and holistic mentoring for Class 10 Foundation, Class 11 &amp; 12 Science (PCM/PCB), Commerce, and Humanities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Message"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                  About Institute
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                  Courses Offered
                </Link>
              </li>
              <li>
                <Link
                  to="/fee-structure"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                  Study Notes
                </Link>
              </li>
              <li>
                <Link
                  to="/online-test"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                  Online MCQ Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/results"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                  Results &amp; Ranks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Courses */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase">
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-secondary-400" />
                  10th Bihar Board (All Subjects)
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-secondary-400" />
                  11th Science (Physics &amp; Chemistry)
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-secondary-400" />
                  12th Science (Physics &amp; Chemistry)
                </Link>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@sarthakinstitute6303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 text-red-500 font-semibold transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  🔴 YouTube Channel (866+ Videos)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase">
              Get in Touch
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <span>{INSTITUTE_ADDRESS}</span>
                <a
                  href="https://maps.app.goo.gl/xQveq6fmWYm39rBJA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-primary-400 font-bold hover:underline mt-1"
                >
                  📍 Open Google Map →
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-primary-400 shrink-0" />
              <a href={`tel:${INSTITUTE_PHONE}`} className="hover:underline">
                {INSTITUTE_PHONE}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <a
                href="https://wa.me/919006859138?text=Hello%20Rakesh%20Sir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline"
              >
                WhatsApp: 9006859138
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-primary-400 shrink-0" />
              <span>{INSTITUTE_EMAIL}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {INSTITUTE_NAME}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-slate-400 transition-colors">
              Student Portal
            </Link>
            <Link to="/admin/login" className="hover:text-slate-400 transition-colors">
              Admin Login
            </Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
