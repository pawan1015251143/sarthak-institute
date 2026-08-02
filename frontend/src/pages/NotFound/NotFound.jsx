import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-primary-50 dark:bg-primary-950/80 text-primary-600 flex items-center justify-center mx-auto">
          <GraduationCap className="w-10 h-10" />
        </div>
        <div>
          <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            404 NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            The requested page or student portal route does not exist or has been moved.
          </p>
        </div>
        <div>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sarthak Institute Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
