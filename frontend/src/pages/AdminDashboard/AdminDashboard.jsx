import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import Modal from '../../components/Modal/Modal';
import {
  Users,
  UserCheck,
  ShieldAlert,
  BookOpen,
  HelpCircle,
  Award,
  CreditCard,
  History,
  Image as ImageIcon,
  GraduationCap,
  Bell,
  Megaphone,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Eye,
  LogOut,
  Upload,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const {
    notes,
    addNote,
    deleteNote,
    tests,
    addTest,
    deleteTest,
    pendingRegistrations,
    approveRegistration,
    rejectRegistration,
    profileEditRequests,
    approveProfileEdit,
    rejectProfileEdit,
    paymentReceipts,
    notices,
    addNotice,
    deleteNotice,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
  } = useUser();

  const [activeTab, setActiveTab] = useState('STUDENTS_REG');

  // New Note Modal
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: '',
    classLevel: 'Class 12',
    subject: 'Mathematics',
    chapter: 'Chapter 1: Relations & Functions',
    fileSize: '2.4 MB',
    uploadedBy: 'Rakesh Sir',
  });

  // New Notice Modal
  const [newNoticeModal, setNewNoticeModal] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'Examination',
    desc: '',
  });

  // New Announcement Modal
  const [newAnnModal, setNewAnnModal] = useState(false);
  const [annForm, setAnnForm] = useState({
    title: '',
    badge: 'NEW BATCH',
    desc: '',
  });

  if (!user) return null;

  const tabs = [
    { id: 'STUDENTS_REG', label: '1. Student Registrations', icon: UserCheck, count: pendingRegistrations.length },
    { id: 'PROFILE_EDITS', label: '2. Profile Edit Requests', icon: ShieldAlert, count: profileEditRequests.length },
    { id: 'NOTES', label: '3. Upload & Manage Notes', icon: BookOpen, count: notes.length },
    { id: 'TESTS', label: '4. Create & Manage Tests', icon: HelpCircle, count: tests.length },
    { id: 'FEES_RECORDS', label: '5. Fee Payment Records', icon: History, count: paymentReceipts.length },
    { id: 'NOTICES', label: '6. Notice Board & Announcements', icon: Megaphone, count: notices.length },
  ];

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    addNote({
      id: Date.now(),
      ...noteForm,
      pdfUrl: '/sample-notes.pdf',
    });
    setNewNoteModal(false);
    setNoteForm({
      title: '',
      classLevel: 'Class 12',
      subject: 'Mathematics',
      chapter: 'Chapter 1',
      fileSize: '2.4 MB',
      uploadedBy: 'Rakesh Sir',
    });
  };

  const handleAddNoticeSubmit = (e) => {
    e.preventDefault();
    addNotice({
      id: Date.now(),
      title: noticeForm.title,
      category: noticeForm.category,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      desc: noticeForm.desc,
    });
    setNewNoticeModal(false);
    setNoticeForm({ title: '', category: 'Examination', desc: '' });
  };

  const handleAddAnnSubmit = (e) => {
    e.preventDefault();
    addAnnouncement({
      id: Date.now(),
      title: annForm.title,
      badge: annForm.badge,
      desc: annForm.desc,
    });
    setNewAnnModal(false);
    setAnnForm({ title: '', badge: 'NEW BATCH', desc: '' });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Admin Top Header Banner */}
      <div className="glass-card p-6 sm:p-8 border-l-4 border-secondary-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-secondary-600 dark:text-secondary-400 uppercase">
            ADMINISTRATION AUTHORITY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Senior Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as: <strong>{user.name}</strong> • Sarthak Institute Control Center
          </p>
        </div>

        <button
          onClick={logout}
          className="btn-outline py-2 px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 border-rose-300"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Portal</span>
        </button>
      </div>

      {/* Admin Quick Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 border-l-4 border-primary-600">
          <div className="text-xs font-bold text-slate-500 uppercase">Pending Registrations</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {pendingRegistrations.length}
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-amber-500">
          <div className="text-xs font-bold text-slate-500 uppercase">Profile Edit Requests</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {profileEditRequests.length}
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-emerald-500">
          <div className="text-xs font-bold text-slate-500 uppercase">Study Notes Uploaded</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {notes.length}
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-secondary-500">
          <div className="text-xs font-bold text-slate-500 uppercase">Fee Payment Records</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {paymentReceipts.length}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-primary-100 dark:bg-primary-950 text-primary-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div>
        {/* TAB 1: Student Registrations Approval */}
        {activeTab === 'STUDENTS_REG' && (
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Approve Student Registrations
                </h3>
                <p className="text-xs text-slate-500">
                  New student applications waiting for counselor verification
                </p>
              </div>
            </div>

            {pendingRegistrations.length > 0 ? (
              <div className="space-y-4">
                {pendingRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-slate-900 dark:text-white">
                          {reg.name}
                        </span>
                        <span className="badge-primary">{reg.classLevel} ({reg.stream})</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Student ID: <strong className="font-mono text-primary-600">{reg.studentId}</strong> • Email: {reg.email} • Phone: {reg.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveRegistration(reg.id)}
                        className="btn-primary py-2 px-4 text-xs font-bold"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Registration</span>
                      </button>
                      <button
                        onClick={() => rejectRegistration(reg.id)}
                        className="btn-outline py-2 px-3 text-xs font-bold text-rose-600 border-rose-300"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm font-semibold">
                All student registrations have been approved! No pending applications.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Profile Edit Requests Approval */}
        {activeTab === 'PROFILE_EDITS' && (
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Approve Profile Edit Requests
              </h3>
              <p className="text-xs text-slate-500">
                Granting approval allows the student to modify their locked profile exactly ONE time.
              </p>
            </div>

            {profileEditRequests.length > 0 ? (
              <div className="space-y-4">
                {profileEditRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-slate-900 dark:text-white">
                          {req.name}
                        </span>
                        <span className="badge-secondary">{req.classLevel}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Student ID: <strong>{req.studentId}</strong> • Reason: “{req.reason}”
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveProfileEdit(req.id)}
                        className="btn-primary py-2 px-4 text-xs font-bold"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve (Allow 1-Time Edit)</span>
                      </button>
                      <button
                        onClick={() => rejectProfileEdit(req.id)}
                        className="btn-outline py-2 px-3 text-xs font-bold text-rose-600 border-rose-300"
                      >
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm font-semibold">
                No pending profile edit requests from students.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Upload & Manage Notes */}
        {activeTab === 'NOTES' && (
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Study Notes &amp; Practice Sheets
                </h3>
                <p className="text-xs text-slate-500">
                  Upload PDF lecture notes by Class, Subject, and Chapter
                </p>
              </div>
              <button
                onClick={() => setNewNoteModal(true)}
                className="btn-primary py-2.5 px-5 text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Note</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge-primary">{note.classLevel}</span>
                      <span className="text-xs font-bold text-slate-500">{note.subject}</span>
                    </div>
                    <div className="text-xs font-extrabold text-secondary-600 dark:text-secondary-400 uppercase">
                      {note.chapter}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {note.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-slate-500">By: {note.uploadedBy}</span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-rose-600 hover:underline font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Create & Manage Tests */}
        {activeTab === 'TESTS' && (
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Online Timed MCQ Tests
                </h3>
                <p className="text-xs text-slate-500">
                  Active tests available for students in the examination center
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge-primary">{t.classLevel}</span>
                      <span className="text-xs font-bold text-slate-500">{t.subject}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {t.title}
                    </h4>
                    <div className="text-xs text-slate-500 mt-1">
                      Duration: <strong>{t.durationMinutes} mins</strong> • {t.totalQuestions} Questions
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-emerald-600 font-bold">● Active Examination</span>
                    <button
                      onClick={() => deleteTest(t.id)}
                      className="text-rose-600 hover:underline font-bold"
                    >
                      Delete Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Fee Payment Records */}
        {activeTab === 'FEES_RECORDS' && (
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                All Fee Payment Receipts &amp; Transactions
              </h3>
              <p className="text-xs text-slate-500">
                Complete audit ledger of student tuition fee transactions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase">
                    <th className="px-6 py-4">Receipt #</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Fee Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  {paymentReceipts.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="px-6 py-4 font-mono font-bold text-primary-600">
                        {rec.receiptNo}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                        {rec.studentName} ({rec.studentId})
                      </td>
                      <td className="px-6 py-4">{rec.courseName}</td>
                      <td className="px-6 py-4">{rec.feeType}</td>
                      <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                        {formatCurrency(rec.amount)}
                      </td>
                      <td className="px-6 py-4">{rec.paymentMethod}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {formatDateTime(rec.transactionDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: Notice Board & Announcements */}
        {activeTab === 'NOTICES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notices */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Institute Notices
                </h3>
                <button
                  onClick={() => setNewNoticeModal(true)}
                  className="btn-primary py-1.5 px-3 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Notice</span>
                </button>
              </div>
              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge-primary">{n.category}</span>
                        <span className="text-xs text-slate-500">{n.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {n.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNotice(n.id)}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Admissions Announcements
                </h3>
                <button
                  onClick={() => setNewAnnModal(true)}
                  className="btn-secondary py-1.5 px-3 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Announcement</span>
                </button>
              </div>
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="badge-secondary mb-1">{a.badge}</span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                        {a.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {a.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteAnnouncement(a.id)}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Note Modal */}
      <Modal
        isOpen={newNoteModal}
        onClose={() => setNewNoteModal(false)}
        title="Upload New Study Note PDF"
      >
        <form onSubmit={handleAddNoteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Note Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Complete Matrices & Determinants Notes"
              value={noteForm.title}
              onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Class *
              </label>
              <select
                value={noteForm.classLevel}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, classLevel: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              >
                <option>Class 10</option>
                <option>Class 11</option>
                <option>Class 12</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                value={noteForm.subject}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, subject: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Chapter Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 3: Matrices"
              value={noteForm.chapter}
              onChange={(e) =>
                setNoteForm({ ...noteForm, chapter: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3">
            <Upload className="w-4 h-4" />
            <span>Upload PDF Note</span>
          </button>
        </form>
      </Modal>

      {/* New Notice Modal */}
      <Modal
        isOpen={newNoticeModal}
        onClose={() => setNewNoticeModal(false)}
        title="Post New Institute Notice"
      >
        <form onSubmit={handleAddNoticeSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notice Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. CBSE Practical Schedule 2026"
              value={noticeForm.title}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category *
            </label>
            <select
              value={noticeForm.category}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, category: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            >
              <option>Examination</option>
              <option>Admissions</option>
              <option>Schedule</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={noticeForm.desc}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, desc: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3">
            <span>Publish Notice</span>
          </button>
        </form>
      </Modal>

      {/* New Announcement Modal */}
      <Modal
        isOpen={newAnnModal}
        onClose={() => setNewAnnModal(false)}
        title="Post New Announcement"
      >
        <form onSubmit={handleAddAnnSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={annForm.title}
              onChange={(e) =>
                setAnnForm({ ...annForm, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Badge Tag *
            </label>
            <input
              type="text"
              required
              value={annForm.badge}
              onChange={(e) =>
                setAnnForm({ ...annForm, badge: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={annForm.desc}
              onChange={(e) =>
                setAnnForm({ ...annForm, desc: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <button type="submit" className="btn-secondary w-full py-3">
            <span>Post Announcement</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
