import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  GraduationCap,
  LogIn,
  LayoutDashboard,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Fee Structure', path: '/fee-structure' },
    { name: 'Notes', path: '/notes' },
    { name: 'Online Test', path: '/online-test' },
    { name: 'Results', path: '/results' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-200/60 dark:border-slate-800/60'
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40'
      }`}
    >
      {/* Motion Kota Style Top Announcement Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 text-slate-950 text-xs sm:text-sm py-2 px-4 font-extrabold shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-950 text-yellow-300 rounded text-[10px] uppercase font-black">
              NEW
            </span>
            <span>
              Admissions Open 2026-27 • Special Scholarship Test Up To 90% • By Rakesh Sir
            </span>
          </div>
          <Link
            to="/courses"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-colors text-xs font-bold"
          >
            Apply Online &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-md border border-slate-200/80 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <img src="/logo.jpg" alt="Sarthak Institute Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-serif font-black tracking-tight text-slate-900 dark:text-white">
                  Sarthak
                </span>
                <span className="text-2xl font-serif font-black tracking-tight text-primary-600 dark:text-primary-400">
                  Institute
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-1">
                Learn • Grow • Succeed
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Login / Dashboard CTA */}
            {user ? (
              <Link
                to={role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'}
                className="btn-primary py-2.5 px-5 text-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn-primary py-2.5 px-5 text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Student Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold text-center transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            {user ? (
              <Link
                to={role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full py-3"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>My Dashboard ({user.name})</span>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full py-3"
              >
                <LogIn className="w-4 h-4" />
                <span>Student Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
