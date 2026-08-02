import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    parentName: '',
    classLevel: 'Class 12',
    stream: 'Science (PCM / PCB)',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const { addPendingRegistration } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudentId = `SI2026${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedId(newStudentId);

    addPendingRegistration({
      id: Date.now(),
      studentId: newStudentId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      parentName: formData.parentName,
      classLevel: formData.classLevel,
      stream: formData.stream,
      status: 'PENDING_APPROVAL',
      date: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-700 flex items-center justify-center text-white mx-auto shadow-xl">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-4">
            Student Admission Registration
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Enroll for Session 2026–27 at Sarthak Institute
          </p>
        </div>

        <div className="glass-card p-8 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Registration Submitted Successfully!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Your provisional Student ID has been generated:
                </p>
                <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800 text-2xl font-mono font-extrabold text-primary-600 dark:text-primary-400">
                  {generatedId}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5 text-left">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Your application is currently <strong>Pending Admin Approval</strong>. Once the Sarthak Institute counselor verifies your application, your Student ID will be activated for login.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/login" className="btn-primary flex-1 text-center">
                  <span>Proceed to Student Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/" className="btn-outline flex-1 text-center">
                  <span>Return to Home Page</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Target Class Level *
                  </label>
                  <select
                    value={formData.classLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, classLevel: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Stream *
                  </label>
                  <select
                    value={formData.stream}
                    onChange={(e) =>
                      setFormData({ ...formData, stream: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Science (PCM / PCB)</option>
                    <option>Commerce &amp; CA Foundation</option>
                    <option>Humanities &amp; CUET Prep</option>
                    <option>Class 10 General Foundation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Set Login Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary w-full py-3.5">
                  <span>Submit Admission Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="text-center mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500">Already registered and approved? </span>
            <Link
              to="/login"
              className="font-extrabold text-primary-600 dark:text-primary-400 hover:underline"
            >
              Sign in to Student Portal &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
