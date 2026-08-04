import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('ADMIN_RAKESH');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { adminLogin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = adminLogin
        ? await adminLogin(adminId, password)
        : await login(adminId, password, true);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Invalid Admin Credentials.');
      }
    } catch (err) {
      setError('An error occurred during admin authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (id, pwd) => {
    setAdminId(id);
    setPassword(pwd);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl mx-auto border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <img src="/logo.jpg" alt="Sarthak Institute Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-4">
            Institute Admin Portal
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Restricted access for Sarthak Institute Senior Authority &amp; Controllers
          </p>
        </div>

        <div className="glass-card p-8 shadow-2xl border-2 border-secondary-500/30">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Admin User ID
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. ADMIN_RAKESH"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Security Code
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-secondary w-full py-3.5 text-sm font-extrabold"
            >
              <span>{loading ? 'Verifying Authority...' : 'Enter Admin Control Center'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase text-center">
              Quick Admin Demo
            </div>
            <button
              type="button"
              onClick={() => handleDemoFill('ADMIN_RAKESH', 'admin123')}
              className="w-full p-2.5 rounded-lg bg-secondary-50 dark:bg-secondary-950/60 border border-secondary-200 dark:border-secondary-800 font-bold text-secondary-800 dark:text-secondary-300 text-xs hover:bg-secondary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login as Rakesh Sir (Senior Admin Demo)</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs">
          <Link
            to="/login"
            className="font-bold text-primary-600 dark:text-primary-400 hover:underline"
          >
            &larr; Switch to Student Portal Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
