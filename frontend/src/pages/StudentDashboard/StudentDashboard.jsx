import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import {
  User,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
  FileText,
  BookOpen,
  HelpCircle,
  Award,
  Bell,
  LogOut,
  ArrowRight,
  Download,
  Trophy,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { paymentReceipts, testAttempts, attendance, notices } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const attendancePercentage =
    attendance.totalDays > 0
      ? ((attendance.presentDays / attendance.totalDays) * 100).toFixed(1)
      : 95.0;

  const latestReceipt =
    paymentReceipts.length > 0 ? paymentReceipts[0] : null;
  const latestResult =
    testAttempts.length > 0 ? testAttempts[testAttempts.length - 1] : null;

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Profile Summary & Welcome Header */}
      <div className="glass-card p-6 sm:p-8 border-l-4 border-primary-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={
              user.photo ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
            }
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Welcome back, {user.name}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                ACTIVE STUDENT
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ID: <strong className="font-mono">{user.studentId}</strong> •{' '}
              {user.classLevel} • {user.stream} • Target: {user.targetExam}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <Link
            to="/profile"
            className="btn-outline py-2 px-4 text-xs"
          >
            <User className="w-4 h-4" />
            <span>Manage Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 2. Fee Status Banner: Monthly & Yearly Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Fee Status */}
        <div className="glass-card p-6 flex flex-col justify-between border-2 border-emerald-500/20">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                MONTHLY FEE STATUS
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                July 2026 Installment
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PAID
            </span>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500">
              Next due: <strong>05 Aug 2026</strong>
            </span>
            <Link
              to="/payment"
              className="font-bold text-primary-600 dark:text-primary-400 hover:underline"
            >
              Pay Next Installment &rarr;
            </Link>
          </div>
        </div>

        {/* Yearly Fee Status */}
        <div className="glass-card p-6 flex flex-col justify-between border-2 border-primary-500/20">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-extrabold tracking-wider text-primary-600 dark:text-primary-400 uppercase">
                YEARLY FULL FEE STATUS
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Session 2026–27 Annual Plan
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
              ACTIVE ENROLLMENT
            </span>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500">
              Receipts available: <strong>{paymentReceipts.length} record(s)</strong>
            </span>
            <Link
              to="/payment-history"
              className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Receipts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Academic Overview & Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Attendance */}
        <Link
          to="/attendance"
          className="glass-card-hover p-6 flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">
              Attendance
            </span>
            <Calendar className="w-5 h-5 text-primary-500" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {attendancePercentage}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {attendance.presentDays} Present / {attendance.totalDays} Days
            </div>
          </div>
          <div className="text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:underline flex items-center gap-1">
            <span>View Attendance Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Study Notes */}
        <Link
          to="/notes"
          className="glass-card-hover p-6 flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">
              Study Notes
            </span>
            <BookOpen className="w-5 h-5 text-secondary-500" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              12+
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Chapter PDFs &amp; Practice Sheets
            </div>
          </div>
          <div className="text-xs font-bold text-secondary-600 dark:text-secondary-400 group-hover:underline flex items-center gap-1">
            <span>Open PDF Notes Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Online MCQ Tests */}
        <Link
          to="/online-test"
          className="glass-card-hover p-6 flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">
              Online Tests
            </span>
            <HelpCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              6 Active
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Timed MCQ &amp; Negative Marking
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
            <span>Start MCQ Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Results & Rank */}
        <Link
          to="/results"
          className="glass-card-hover p-6 flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">
              Results &amp; Rank
            </span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {latestResult ? `Rank #${latestResult.rank}` : 'Rank #3'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {latestResult ? `${latestResult.percentage}% Score` : '95.6% Overall Average'}
            </div>
          </div>
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:underline flex items-center gap-1">
            <span>View Result PDF &amp; Chart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* 4. Homework, Assignments & Institute Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Homework & Assignments Quick Drawer */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-500" />
                <span>Pending Homework &amp; Assignments</span>
              </h3>
              <div className="flex gap-2">
                <Link to="/homework" className="text-xs font-bold text-primary-600 hover:underline">
                  Homework &rarr;
                </Link>
                <Link to="/assignments" className="text-xs font-bold text-secondary-600 hover:underline">
                  Assignments &rarr;
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Physics: Chapter 4 Electrostatics Assignment
                  </div>
                  <div className="text-xs text-slate-500">
                    Due: Tomorrow 5:00 PM • 15 Numerical Problems
                  </div>
                </div>
                <Link to="/assignments" className="btn-outline py-1.5 px-3 text-xs">
                  Download Sheet
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Maths: Differential Calculus Exercise 6.3
                  </div>
                  <div className="text-xs text-slate-500">
                    Due: 04 Aug 2026 • Rakesh Sir Batch
                  </div>
                </div>
                <Link to="/homework" className="btn-outline py-1.5 px-3 text-xs">
                  View Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Institute Notices & Announcements */}
        <div className="lg:col-span-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-secondary-500" />
                <span>Institute Notices &amp; Circulars</span>
              </h3>
              <Link to="/notices" className="text-xs font-bold text-primary-600 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {notices.slice(0, 3).map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="badge-primary">{note.category}</span>
                    <span className="text-slate-500">{note.date}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {note.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {note.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
