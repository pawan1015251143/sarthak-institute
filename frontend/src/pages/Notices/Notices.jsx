import React from 'react';
import { useUser } from '../../context/UserContext';
import { Bell, Calendar } from 'lucide-react';

const Notices = () => {
  const { notices } = useUser();

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <div>
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          OFFICIAL CIRCULARS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Institute Notice Board &amp; Announcements
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((n) => (
          <div
            key={n.id}
            className="glass-card p-6 border-l-4 border-primary-600 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="badge-primary">{n.category}</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {n.date}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {n.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {n.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
