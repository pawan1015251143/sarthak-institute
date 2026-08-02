import React from 'react';
import { useUser } from '../../context/UserContext';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';

const Attendance = () => {
  const { attendance } = useUser();

  const percentage = ((attendance.presentDays / attendance.totalDays) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <div>
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          ATTENDANCE REGISTER
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Student Attendance &amp; Presence Record
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-emerald-500">
          <div className="text-xs font-bold text-slate-500 uppercase">Present Days</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">
            {attendance.presentDays} <span className="text-sm text-slate-500">Days</span>
          </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-rose-500">
          <div className="text-xs font-bold text-slate-500 uppercase">Absent Days</div>
          <div className="text-3xl font-extrabold text-rose-600 mt-2">
            {attendance.absentDays} <span className="text-sm text-slate-500">Days</span>
          </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-primary-500">
          <div className="text-xs font-bold text-slate-500 uppercase">Attendance Rate</div>
          <div className="text-3xl font-extrabold text-primary-600 mt-2">
            {percentage}%
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 font-extrabold text-lg">
          Recent Daily Logs
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
          {attendance.records.map((rec, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{rec.date}</div>
                <div className="text-xs text-slate-500">{rec.subject}</div>
              </div>
              <div>
                {rec.status === 'Present' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950 text-rose-600">
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
