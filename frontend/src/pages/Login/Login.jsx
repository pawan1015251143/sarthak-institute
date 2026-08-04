import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

const Login = () => {
  const [studentId, setStudentId] = useState('SI20261042');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/student-dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(studentId, password, false);
      if (res.success) {
        // check if first login
        if (res.isFirstLogin || !res.user.profileCompleted) {
          navigate('/profile', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(res.message || 'Invalid Student ID or Password.');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (id, pwd) => {
    setStudentId(id);
    setPassword(pwd);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Top Logo */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl mx-auto border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <img src="/logo.jpg" alt="Sarthak Institute Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-4">
            Student Portal Login
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Sign in with your official Sarthak Institute credentials
          </p>
        </div>

        {/* Login Form Card */}
        <div className="glass-card p-8 shadow-2xl border-2 border-primary-500/20">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Student ID
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. SI20261042"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-primary-600"
                />
                <span className="text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <span className="text-primary-600 dark:text-primary-400 font-semibold hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-sm font-extrabold"
            >
              <span>{loading ? 'Authenticating...' : 'Sign in to Student Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Box */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase text-center">
              Quick Demo Credentials
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoFill('SI20261042', 'password123')}
                className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 font-bold text-primary-700 dark:text-primary-300 hover:bg-primary-100 transition-colors"
              >
                🎓 Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('SI2026FIRST', 'password123')}
                className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors"
              >
                ✨ First Login Demo
              </button>
            </div>
          </div>
        </div>

        {/* Links to Register / Admin Login */}
        <div className="text-center space-y-2 text-xs">
          <div>
            <span className="text-slate-500">New student without login ID? </span>
            <Link
              to="/register"
              className="font-extrabold text-primary-600 dark:text-primary-400 hover:underline"
            >
              Register for Admission &rarr;
            </Link>
          </div>
          <div>
            <span className="text-slate-500">Institute Administrator or Faculty? </span>
            <Link
              to="/admin/login"
              className="font-extrabold text-slate-800 dark:text-slate-200 hover:underline inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal Login &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
