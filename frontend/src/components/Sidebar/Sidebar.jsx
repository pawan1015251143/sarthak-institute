import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  CheckSquare,
  CreditCard,
  FileText,
  BookOpen,
  Award,
  Bell,
  LogOut,
  GraduationCap,
  Users,
  Settings,
  Upload,
  BarChart3,
  DollarSign,
  Calendar,
} from 'lucide-react';

const Sidebar = ({ isAdmin = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const studentNav = [
    { name: 'Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Attendance', path: '/attendance', icon: CheckSquare },
    { name: 'Fee & Payments', path: '/payment-history', icon: CreditCard },
    { name: 'Study Notes', path: '/notes', icon: BookOpen },
    { name: 'Homework & Tasks', path: '/homework', icon: FileText },
    { name: 'Online Tests', path: '/online-test', icon: Award },
    { name: 'My Results', path: '/results', icon: BarChart3 },
    { name: 'Notices & Alerts', path: '/notices', icon: Bell },
  ];

  const adminNav = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Student Management', path: '/admin/students', icon: Users },
    { name: 'Profile Edit Requests', path: '/admin/edit-requests', icon: Settings },
    { name: 'Upload Notes', path: '/admin/upload-notes', icon: Upload },
    { name: 'Create MCQ Tests', path: '/admin/create-tests', icon: Award },
    { name: 'Manage Fees & Receipts', path: '/admin/fees', icon: DollarSign },
    { name: 'Notice Board', path: '/admin/notices', icon: Bell },
  ];

  const navItems = isAdmin ? adminNav : studentNav;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 sidebar-glass shrink-0 hidden md:flex flex-col justify-between h-screen sticky top-0 py-6 px-4">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
            <img src="/logo.jpg" alt="Sarthak Institute Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              SARTHAK
            </div>
            <div className="text-[10px] font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest">
              {isAdmin ? 'ADMIN PORTAL' : 'STUDENT PORTAL'}
            </div>
          </div>
        </div>

        {/* User Card */}
        {user && (
          <div className="p-3 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
            <img
              src={user.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {user.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {isAdmin ? 'Senior Admin' : `${user.studentId} • ${user.classLevel}`}
              </div>
            </div>
          </div>
        )}

        {/* Nav list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
