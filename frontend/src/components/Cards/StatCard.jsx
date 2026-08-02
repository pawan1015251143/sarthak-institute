import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400',
    yellow: 'bg-secondary-50 dark:bg-secondary-950/60 text-secondary-600 dark:text-secondary-400',
    green: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="glass-card p-6 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          {title}
        </div>
        <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
          {value}
        </div>
        {subtitle && (
          <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
        )}
      </div>

      {Icon && (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClasses[color] || colorClasses.blue}`}>
          <Icon className="w-7 h-7" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
