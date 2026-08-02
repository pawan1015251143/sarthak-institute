import React from 'react';
import { useUser } from '../../context/UserContext';
import { FileText, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

const Homework = () => {
  const { homeworks } = useUser();

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <div>
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          DAILY ACADEMIC TASKS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Homework &amp; Practice Sheets
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworks.map((hw) => (
          <div key={hw.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge-primary">{hw.subject}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  hw.status === 'Pending'
                    ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700'
                }`}>
                  {hw.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {hw.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                {hw.desc}
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              <span>Due: <strong>{hw.dueDate}</strong></span>
              <span>By: {hw.assignedBy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homework;
