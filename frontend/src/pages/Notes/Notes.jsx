import React, { useState, useMemo } from 'react';
import { useUser } from '../../context/UserContext';
import Modal from '../../components/Modal/Modal';
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  CheckCircle2,
  FileDown,
} from 'lucide-react';

const Notes = () => {
  const { notes } = useUser();
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedChapter, setSelectedChapter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewerNote, setViewerNote] = useState(null);

  const classList = ['All', 'Class 10', 'Class 11', 'Class 12'];

  const subjectList = useMemo(() => {
    const subs = new Set();
    notes.forEach((n) => {
      if (selectedClass === 'All' || n.classLevel === selectedClass) {
        subs.add(n.subject);
      }
    });
    return ['All', ...Array.from(subs)];
  }, [notes, selectedClass]);

  const chapterList = useMemo(() => {
    const chaps = new Set();
    notes.forEach((n) => {
      if (
        (selectedClass === 'All' || n.classLevel === selectedClass) &&
        (selectedSubject === 'All' || n.subject === selectedSubject)
      ) {
        chaps.add(n.chapter);
      }
    });
    return ['All', ...Array.from(chaps)];
  }, [notes, selectedClass, selectedSubject]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (selectedClass !== 'All' && note.classLevel !== selectedClass)
        return false;
      if (selectedSubject !== 'All' && note.subject !== selectedSubject)
        return false;
      if (selectedChapter !== 'All' && note.chapter !== selectedChapter)
        return false;
      if (
        searchQuery &&
        !note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !note.chapter.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [notes, selectedClass, selectedSubject, selectedChapter, searchQuery]);

  const handleDownload = (note) => {
    // triggers download of sample note
    const link = document.createElement('a');
    link.href = note.pdfUrl || '#';
    link.download = `${note.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          ACADEMIC RESOURCES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Chapter-Wise Study Notes &amp; Practice Sheets
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base">
          Filter by Class &rarr; Subject &rarr; Chapter to preview or download complete PDF lecture notes prepared by Sarthak Institute faculty.
        </p>
      </div>

      {/* Filter Pipeline Box: Class -> Subject -> Chapter */}
      <div className="glass-card p-6 md:p-8 space-y-6 border-2 border-primary-500/20">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
          <Filter className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span>Step-by-Step Filter Pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Class Select */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              1. Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject('All');
                setSelectedChapter('All');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {classList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Select */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              2. Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapter('All');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {subjectList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Select */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              3. Select Chapter
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {chapterList.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          {/* Search Keyword */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Search by Keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Title or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="glass-card-hover p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-primary">{note.classLevel}</span>
                  <span className="text-xs font-bold text-slate-500">
                    {note.subject}
                  </span>
                </div>

                <div className="text-xs font-extrabold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider mb-1">
                  {note.chapter}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  {note.title}
                </h3>

                <div className="text-xs text-slate-500 flex items-center justify-between py-2 border-y border-slate-200 dark:border-slate-800 mb-4">
                  <span>Uploaded by: <strong>{note.uploadedBy}</strong></span>
                  <span>Size: {note.fileSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setViewerNote(note)}
                  className="btn-outline flex-1 py-2 text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>PDF Viewer</span>
                </button>
                <button
                  onClick={() => handleDownload(note)}
                  className="btn-primary flex-1 py-2 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-16 text-slate-500 font-semibold">
            No study notes match the selected Class, Subject, and Chapter filters.
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      <Modal
        isOpen={!!viewerNote}
        onClose={() => setViewerNote(null)}
        title={viewerNote ? `PDF Viewer: ${viewerNote.title}` : 'PDF Viewer'}
        maxWidth="max-w-4xl"
      >
        {viewerNote && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-sm">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {viewerNote.chapter}
                </div>
                <div className="text-xs text-slate-500">
                  {viewerNote.classLevel} • {viewerNote.subject} • {viewerNote.fileSize}
                </div>
              </div>
              <button
                onClick={() => handleDownload(viewerNote)}
                className="btn-primary py-2 px-4 text-xs"
              >
                <FileDown className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Simulated PDF Preview Sheet */}
            <div className="min-h-[420px] bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-8 sm:p-12 shadow-inner font-mono text-xs text-slate-800 dark:text-slate-200 space-y-6">
              <div className="text-center border-b-2 border-slate-300 pb-4">
                <div className="font-sans text-lg font-black tracking-wider uppercase">
                  SARTHAK INSTITUTE — LECTURE NOTE SHEET
                </div>
                <div className="text-slate-500 mt-1">
                  Subject: {viewerNote.subject} | {viewerNote.chapter}
                </div>
              </div>

              <div className="space-y-4 leading-relaxed">
                <p className="font-bold text-sm text-primary-600">
                  1. Fundamental Principles &amp; Definitions
                </p>
                <p>
                  In this module, we examine the core properties governing {viewerNote.subject} problems in Class 10, 11 &amp; 12 examinations. Pay close attention to standard formula substitutions and step-by-step NCERT proofs.
                </p>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-sans">
                  <div className="font-bold text-xs text-secondary-600 mb-1">
                    KEY FORMULA / THEOREM BOX:
                  </div>
                  <code>
                    f(x) = ∫ g(t) dt  ⟺  d/dx [f(x)] = g(x)  (Fundamental Theorem)
                  </code>
                </div>

                <p className="font-bold text-sm text-primary-600">
                  2. Solved Board &amp; Competitive Example
                </p>
                <p>
                  Example 1: Determine the invertibility of square matrix A where A² - 5A + 7I = 0.
                  <br />
                  Solution: A(A - 5I) = -7I  ⟹  A [ (5I - A)/7 ] = I. Hence A⁻¹ = (5I - A)/7.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Notes;
