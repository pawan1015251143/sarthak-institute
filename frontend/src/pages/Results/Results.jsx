import React, { useState } from 'react';
import useSEO from '../../hooks/useSEO';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import PerformanceChart from '../../components/Charts/PerformanceChart';
import jsPDF from 'jspdf';
import {
  Award,
  Download,
  Trophy,
  CheckCircle2,
  BarChart3,
  BookOpen,
  FileText,
} from 'lucide-react';
import { INSTITUTE_NAME, INSTITUTE_PHONE } from '../../utils/constants';

const Results = () => {
  useSEO({
    title: 'Results & Success Stories',
    description: 'Check out the outstanding results and success stories of Sarthak Institute students in Bihar Board Class 10th and 12th exams.',
    path: '/results'
  });

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const { testAttempts } = useUser();

  const [selectedExam, setSelectedExam] = useState('Term 1 Board Mock Exam 2026');

  // Sample subject-wise marks
  const subjectMarks = [
    { subject: 'Mathematics', score: 98, maxScore: 100, grade: 'A1', remarks: 'Outstanding' },
    { subject: 'Physics', score: 95, maxScore: 100, grade: 'A1', remarks: 'Excellent Concept' },
    { subject: 'Chemistry', score: 94, maxScore: 100, grade: 'A1', remarks: 'Very Good' },
    { subject: 'English Core', score: 92, maxScore: 100, grade: 'A1', remarks: 'Well Expressed' },
    { subject: 'Physical Education / Bio', score: 96, maxScore: 100, grade: 'A1', remarks: 'Topper Mark' },
  ];

  const totalObtained = subjectMarks.reduce((acc, s) => acc + s.score, 0);
  const totalMax = subjectMarks.reduce((acc, s) => acc + s.maxScore, 0);
  const overallPercentage = ((totalObtained / totalMax) * 100).toFixed(1);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text(INSTITUTE_NAME.toUpperCase(), 105, 25, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Official Academic Performance Card | Phone: ${INSTITUTE_PHONE}`, 105, 33, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 39, 190, 39);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`EXAMINATION RESULT: ${selectedExam}`, 105, 50, { align: "center" });

    doc.setFontSize(11);
    doc.text(`Student Name: ${user ? user.name : "Arjun Verma"}`, 25, 65);
    doc.text(`Student ID: ${user ? user.studentId : "SI20261042"}`, 130, 65);
    doc.text(`Class / Level: ${user ? user.classLevel : "Class 12"}`, 25, 73);

    // Table Headers
    let y = 90;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 6, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Subject", 25, y);
    doc.text("Marks Obtained", 95, y);
    doc.text("Max Marks", 140, y);
    doc.text("Grade", 170, y);

    y += 12;
    doc.setFont("helvetica", "normal");
    subjectMarks.forEach((item) => {
      doc.text(item.subject, 25, y);
      doc.text(String(item.score), 105, y);
      doc.text(String(item.maxScore), 145, y);
      doc.text(item.grade, 175, y);
      y += 10;
    });

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Marks: ${totalObtained} / ${totalMax}`, 25, y);
    doc.text(`Overall Percentage: ${overallPercentage}%`, 110, y);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("Certified by Sarthak Institute Academic Controller", 105, y + 25, { align: "center" });

    doc.save(`${user ? user.studentId : "Student"}_Result_Sarthak_Institute.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            ACADEMIC PERFORMANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Result Card &amp; Subject-Wise Marks
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Check exam marks, overall percentage, and download certified result PDF.
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="btn-primary py-3 px-6 text-sm font-bold shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Result PDF</span>
        </button>
      </div>

      {/* Overview Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-primary-600">
          <div className="text-xs font-bold text-slate-500 uppercase">
            Overall Percentage
          </div>
          <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mt-2">
            {overallPercentage}%
          </div>
          <div className="text-xs font-bold text-emerald-600 mt-1">
            ★ Distinction &amp; Merit Qualified
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-secondary-500">
          <div className="text-xs font-bold text-slate-500 uppercase">
            Total Aggregate Score
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white mt-2">
            {totalObtained} <span className="text-lg text-slate-500">/ {totalMax}</span>
          </div>
          <div className="text-xs font-bold text-slate-500 mt-1">
            5 Core Subjects Evaluated
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-emerald-500">
          <div className="text-xs font-bold text-slate-500 uppercase">
            Institute Leaderboard Rank
          </div>
          <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            Rank #3
          </div>
          <div className="text-xs font-bold text-slate-500 mt-1">
            Out of 240 batch students
          </div>
        </div>
      </div>

      {/* Subject-Wise Table & Performance Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table */}
        <div className="lg:col-span-7 glass-card overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Subject-Wise Marks Breakdown
            </h3>
            <span className="badge-primary">{selectedExam}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase">
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Obtained</th>
                  <th className="px-6 py-4">Max Marks</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {subjectMarks.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {m.subject}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-primary-600 dark:text-primary-400">
                      {m.score}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{m.maxScore}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        {m.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                      {m.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="lg:col-span-5">
          <PerformanceChart
            data={subjectMarks}
            title="Visual Subject-Wise Percentage"
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
