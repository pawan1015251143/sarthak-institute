import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import {
  User,
  Lock,
  Unlock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Save,
  Send,
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, requestProfileEdit } = useAuth();
  const { addProfileEditRequest } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    parentName: user?.parentName || '',
    dob: user?.dob || '2008-05-14',
    gender: user?.gender || 'Male',
    address: user?.address || 'MG Road, Indore, MP',
    boardName: user?.boardName || 'CBSE Board',
    targetExam: user?.targetExam || 'JEE Mains + Advanced',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [requestSent, setRequestSent] = useState(
    user?.editRequestStatus === 'PENDING'
  );

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        parentName: user.parentName || '',
        dob: user.dob || '2008-05-14',
        gender: user.gender || 'Male',
        address: user.address || 'MG Road, Indore, MP',
        boardName: user.boardName || 'CBSE Board',
        targetExam: user.targetExam || 'JEE Mains + Advanced',
      });
      setRequestSent(user.editRequestStatus === 'PENDING');
    }
  }, [user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSuccessMsg('');

    // Update user profile in Auth context
    updateProfile({
      ...formData,
      profileCompleted: true,
      canEditOnce: false, // consume one-time edit right if it was granted
      editRequestStatus: 'NONE',
    });

    setSuccessMsg('Profile details saved and locked successfully!');
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 1500);
  };

  const handleSendEditRequest = () => {
    if (!user) return;
    requestProfileEdit();
    addProfileEditRequest({
      id: Date.now(),
      studentId: user.studentId,
      name: user.name,
      classLevel: user.classLevel,
      reason: 'Update residential address and contact details',
      status: 'PENDING',
      requestDate: new Date().toISOString(),
    });
    setRequestSent(true);
  };

  if (!user) {
    return null;
  }

  const isFirstLogin = !user.profileCompleted;
  const isUnlockedForEdit = user.canEditOnce === true || isFirstLogin;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Page Title & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            STUDENT ACCOUNT MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {isFirstLogin
              ? 'First Login: Complete Your Profile'
              : 'Official Student Profile Card'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isFirstLogin
              ? 'You must complete mandatory registration fields before accessing the student dashboard.'
              : 'Verified profile records stored in Sarthak Institute database.'}
          </p>
        </div>

        <div>
          {isFirstLogin ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <AlertTriangle className="w-4 h-4" />
              INCOMPLETE PROFILE
            </span>
          ) : isUnlockedForEdit ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Unlock className="w-4 h-4" />
              ONE-TIME EDIT APPROVED
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
              <Lock className="w-4 h-4" />
              LOCKED PROFILE
            </span>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg} — Redirecting to Dashboard...</span>
        </div>
      )}

      {/* Pending Edit Request Notice */}
      {!isUnlockedForEdit && requestSent && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              Your Request for Profile Edit has been submitted and is currently{' '}
              <strong>Pending Admin Approval</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="glass-card p-8 sm:p-10 border-2 border-primary-500/20 space-y-6">
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Header summary badge */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <img
              src={
                user.photo ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
              }
              alt={formData.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                {formData.name || 'Student Name'}
              </div>
              <div className="text-xs font-mono text-primary-600 dark:text-primary-400 font-bold">
                ID: {user.studentId} • {user.classLevel} ({user.stream})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                disabled={!isUnlockedForEdit}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                disabled={!isUnlockedForEdit}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                disabled={!isUnlockedForEdit}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                disabled={!isUnlockedForEdit}
                value={formData.parentName}
                onChange={(e) =>
                  setFormData({ ...formData, parentName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                disabled={!isUnlockedForEdit}
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Gender *
              </label>
              <select
                disabled={!isUnlockedForEdit}
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Board Name *
              </label>
              <select
                disabled={!isUnlockedForEdit}
                value={formData.boardName}
                onChange={(e) =>
                  setFormData({ ...formData, boardName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
              >
                <option>CBSE Board</option>
                <option>MP State Board</option>
                <option>ICSE / CISCE Board</option>
                <option>Other Board</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Residential Address *
            </label>
            <input
              type="text"
              required
              disabled={!isUnlockedForEdit}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Target Competitive Examination *
            </label>
            <input
              type="text"
              required
              disabled={!isUnlockedForEdit}
              value={formData.targetExam}
              onChange={(e) =>
                setFormData({ ...formData, targetExam: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-60"
            />
          </div>

          {/* Buttons depending on lock state */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {isUnlockedForEdit ? (
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto py-3 px-8 text-sm font-bold"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile &amp; Lock Record</span>
              </button>
            ) : (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Profile is locked for security. To modify address, phone, or target exam, request permission below.
                </span>
                <button
                  type="button"
                  disabled={requestSent}
                  onClick={handleSendEditRequest}
                  className="btn-secondary py-3 px-6 text-xs sm:text-sm shrink-0 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {requestSent
                      ? 'Edit Request Pending Admin Approval'
                      : 'Request Profile Edit'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
