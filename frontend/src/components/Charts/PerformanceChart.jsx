import React from 'react';

const PerformanceChart = ({ data, title = "Subject-Wise Performance Analysis" }) => {
  // data format: [{ subject: 'Mathematics', score: 95, maxScore: 100 }, ...]
  return (
    <div className="glass-card p-6">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="space-y-5">
        {data.map((item, idx) => {
          const percentage = Math.round((item.score / item.maxScore) * 100);
          return (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                <span className="text-slate-800 dark:text-slate-200">{item.subject}</span>
                <span className="text-primary-600 dark:text-primary-400 font-bold">
                  {item.score} / {item.maxScore} ({percentage}%)
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-secondary-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceChart;
