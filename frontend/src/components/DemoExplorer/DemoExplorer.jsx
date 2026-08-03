import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  X,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Globe,
  LayoutDashboard,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const DemoExplorer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ACCOUNTS');
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  // Instant 1-Click Demo Login Handlers
  const handleInstantAdminLogin = () => {
    logout();
    login(
      { email: 'rakesh.sir@sarthakinstitute.edu.in', password: 'admin123', role: 'ADMIN' },
      () => {
        setIsOpen(false);
        navigate('/admin');
      }
    );
  };

  const handleInstantStudentLogin = () => {
    logout();
    login(
      { email: 'arjun.verma@example.com', password: 'password123', role: 'STUDENT' },
      () => {
        setIsOpen(false);
        navigate('/student-dashboard');
      }
    );
  };

  const handleInstantFirstLoginStudent = () => {
    logout();
    login(
      { email: 'sneha.mukherjee@example.com', password: 'password123', role: 'STUDENT' },
      () => {
        setIsOpen(false);
        navigate('/profile');
      }
    );
  };

  const publicLinks = [
    { name: '1. Home Page (Hero & Banner)', path: '/' },
    { name: '2. About Institute & Faculty', path: '/about' },
    { name: '3. Courses Offered (Filterable)', path: '/courses' },
    { name: '4. Fee Structure & UPI Options', path: '/fee-structure' },
    { name: '5. Study Notes & PDF Preview', path: '/notes' },
    { name: '6. Online MCQ Test & Timer', path: '/online-test' },
    { name: '7. Results, Rank & Chart', path: '/results' },
    { name: '8. Photo Gallery & Lightbox', path: '/gallery' },
    { name: '9. Contact Us & Google Map', path: '/contact' },
    { name: '10. Student / Admin Login', path: '/login' },
  ];

  const portalLinks = [
    { name: '11. Student Dashboard', path: '/student-dashboard', badge: 'Student' },
    { name: '12. Profile & One-Time Edit Lock', path: '/profile', badge: 'Student' },
    { name: '13. Online Tuition Fee Payment', path: '/payment', badge: 'Student' },
    { name: '14. Fee Receipts & PDF Download', path: '/payment-history', badge: 'Student' },
    { name: '15. Attendance Register & Logs', path: '/attendance', badge: 'Student' },
    { name: '16. Homework Tasks & Status', path: '/homework', badge: 'Student' },
    { name: '17. Assignments & PDF Sheets', path: '/assignments', badge: 'Student' },
    { name: '18. Notice Board & Circulars', path: '/notices', badge: 'Public/Student' },
    { name: '19. Senior Admin Control Center', path: '/admin', badge: 'Admin Only' },
  ];

  return (
    <>
      {/* Floating Demo Explorer Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 text-white font-extrabold text-sm shadow-2xl hover:scale-105 hover:shadow-primary-500/50 transition-all border border-white/20"
        title="Open Sarthak Institute All-In-One Demo Explorer"
      >
        <Sparkles className="w-5 h-5 animate-spin-slow" />
        <span>🚀 Demo Explorer (See All 22 Pages At Once)</span>
      </button>

      {/* Demo Explorer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-primary-500/30 shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">
                    Sarthak Institute — All-in-One Demo Explorer
                  </h3>
                  <p className="text-xs text-white/80">
                    Ek hi click me website ke sabhi 22 pages aur features ko dekhe w test kare!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shrink-0">
              <button
                onClick={() => setActiveTab('ACCOUNTS')}
                className={`flex-1 py-3 px-4 text-xs font-extrabold text-center transition-colors border-b-2 ${
                  activeTab === 'ACCOUNTS'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400 bg-white dark:bg-slate-800'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ⚡ 1-Click Instant Demo Logins
              </button>
              <button
                onClick={() => setActiveTab('PUBLIC')}
                className={`flex-1 py-3 px-4 text-xs font-extrabold text-center transition-colors border-b-2 ${
                  activeTab === 'PUBLIC'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400 bg-white dark:bg-slate-800'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🌐 All 10 Public Pages
              </button>
              <button
                onClick={() => setActiveTab('PORTALS')}
                className={`flex-1 py-3 px-4 text-xs font-extrabold text-center transition-colors border-b-2 ${
                  activeTab === 'PORTALS'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400 bg-white dark:bg-slate-800'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🎓 All Student &amp; Admin Portals
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: 1-Click Accounts */}
              {activeTab === 'ACCOUNTS' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Bina password type kiye ek click me kisi bhi role (Admin ya Student) se login kare:
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Admin Rakesh Sir */}
                    <button
                      onClick={handleInstantAdminLogin}
                      className="p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-950/60 dark:to-primary-900/30 border-2 border-primary-500/30 hover:border-primary-500 flex items-center justify-between text-left transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                          👑
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                              Login as Senior Admin (Rakesh Sir)
                            </h4>
                            <span className="badge-primary">ADMIN ROLE</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            Approve Registrations, Profile Edits, Upload Notes, Tests, Gallery &amp; Fees Ledger.
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Student Arjun Verma */}
                    <button
                      onClick={handleInstantStudentLogin}
                      className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/60 dark:to-emerald-900/30 border-2 border-emerald-500/30 hover:border-emerald-500 flex items-center justify-between text-left transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                          🎓
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                              Login as Active Student (Arjun Verma)
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                              STUDENT ROLE
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            Class 12 Science PCM — Access full Dashboard, Attendance, Fee Receipts &amp; MCQ Tests.
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* First Login Student Demo */}
                    <button
                      onClick={handleInstantFirstLoginStudent}
                      className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/60 dark:to-amber-900/30 border-2 border-amber-500/30 hover:border-amber-500 flex items-center justify-between text-left transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                          ⚡
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                              Test First Login Wizard (Sneha Mukherjee)
                            </h4>
                            <span className="badge-secondary">FIRST LOGIN DEMO</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            Demonstrates compulsory profile completion on first login &amp; subsequent Profile Lock.
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Public Pages */}
              {activeTab === 'PUBLIC' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {publicLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsOpen(false);
                        navigate(link.path);
                      }}
                      className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/60 border border-slate-200 dark:border-slate-700 hover:border-primary-500 flex items-center justify-between text-left transition-all text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-4 h-4 text-primary-500 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* TAB 3: Student & Admin Portals */}
              {activeTab === 'PORTALS' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {portalLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsOpen(false);
                        navigate(link.path);
                      }}
                      className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/60 border border-slate-200 dark:border-slate-700 hover:border-primary-500 flex items-center justify-between text-left transition-all text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      <div>
                        <div>{link.name}</div>
                        <span className="text-[10px] font-extrabold text-primary-600 dark:text-primary-400">
                          {link.badge}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-primary-500 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>Sarthak Institute Coaching Management System • Live Preview Hub</span>
              <button
                onClick={() => setIsOpen(false)}
                className="font-bold text-primary-600 hover:underline"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoExplorer;
