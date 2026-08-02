import React from 'react';
import { useUser } from '../../context/UserContext';
import { FileText, Download, Calendar } from 'lucide-react';

const Assignments = () => {
  const { assignments } = useUser();

  const handleDownload = (asn) => {
    const link = document.createElement('a');
    link.href = asn.pdfUrl || '#';
    link.download = `${asn.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <div>
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          EVALUATION &amp; ASSIGNMENTS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Downloadable Assignment Sheets
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((a) => (
          <div key={a.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge-primary">{a.subject}</span>
                <span className="text-xs text-slate-500">{a.dueDate}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {a.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                {a.desc}
              </p>
            </div>
            <button
              onClick={() => handleDownload(a)}
              className="btn-primary w-full py-2.5 text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Download Assignment PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
