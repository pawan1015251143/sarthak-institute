import React from 'react';
import { GraduationCap } from 'lucide-react';

const Loader = ({ message = "Loading Sarthak Institute..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="relative mb-6">
        {/* Pulsing Back Glow */}
        <div className="absolute inset-0 bg-primary-500/30 rounded-full blur-xl animate-pulse" />
        {/* Spinning Outer Ring */}
        <div className="w-20 h-20 rounded-full border-4 border-primary-200 dark:border-slate-800 border-t-primary-600 dark:border-t-primary-400 animate-spin flex items-center justify-center" />
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-pulse" />
        </div>
      </div>
      <h3 className="text-lg font-extrabold text-slate-800 dark:text-white tracking-tight">
        {message}
      </h3>
      <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">
        Excellence in Class 10 • 11 • 12
      </p>
    </div>
  );
};

export default Loader;
