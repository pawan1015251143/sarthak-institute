import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { INSTITUTE_NAME, INSTITUTE_ADDRESS, INSTITUTE_PHONE } from '../../utils/constants';
import jsPDF from 'jspdf';
import {
  GraduationCap,
  Download,
  Printer,
  History,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Stamp,
} from 'lucide-react';

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (location.state && location.state.receipt) {
      setReceipt(location.state.receipt);
    } else {
      // fallback sample receipt for direct view/demo
      setReceipt({
        receiptNo: "REC-2026-834912",
        paymentId: "PAY_9K2L8X1M0Q",
        studentName: "Arjun Verma",
        studentId: "SI20261042",
        classLevel: "Class 12",
        courseName: "Class 12 Science (PCM / PCB + Boards)",
        feeType: "Yearly",
        amount: 40000,
        paymentMethod: "UPI",
        transactionDate: new Date().toISOString(),
        status: "Paid",
      });
    }
  }, [location.state]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!receipt) return;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // primary blue
    doc.text(INSTITUTE_NAME.toUpperCase(), 105, 25, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(INSTITUTE_ADDRESS, 105, 32, { align: "center" });
    doc.text(`Phone: ${INSTITUTE_PHONE} | Official Fee Receipt`, 105, 38, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 43, 190, 43);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("FEE PAYMENT RECEIPT", 105, 53, { align: "center" });

    // Table entries
    let y = 68;
    const lineSpacing = 9;

    const fields = [
      ["Receipt Number:", receipt.receiptNo],
      ["Payment ID:", receipt.paymentId],
      ["Student Name:", receipt.studentName],
      ["Student ID:", receipt.studentId],
      ["Class / Course:", `${receipt.classLevel} - ${receipt.courseName}`],
      ["Fee Type:", receipt.feeType],
      ["Amount Paid:", `INR ${receipt.amount.toLocaleString()}`],
      ["Payment Method:", receipt.paymentMethod],
      ["Transaction Date:", formatDateTime(receipt.transactionDate)],
      ["Status:", receipt.status],
    ];

    doc.setFontSize(11);
    fields.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), 80, y);
      y += lineSpacing;
    });

    // Signatures & Stamp area
    y += 15;
    doc.setLineWidth(0.3);
    doc.line(25, y + 15, 80, y + 15);
    doc.line(130, y + 15, 185, y + 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Authorized Signature", 30, y + 21);
    doc.text("Institute Official Stamp", 135, y + 21);

    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("This is a computer-generated fee receipt. No physical signature required.", 105, y + 35, { align: "center" });

    doc.save(`${receipt.receiptNo}_Sarthak_Institute.pdf`);
  };

  if (!receipt) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/fee-structure"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fee Structure</span>
        </Link>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleDownloadPDF}
            className="btn-primary py-2.5 px-5 text-xs sm:text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt as PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="btn-outline py-2.5 px-5 text-xs sm:text-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <Link
            to="/payment-history"
            className="btn-secondary py-2.5 px-5 text-xs sm:text-sm"
          >
            <History className="w-4 h-4" />
            <span>View Payment History</span>
          </Link>
        </div>
      </div>

      {/* Printable Receipt Container */}
      <div
        id="printable-receipt"
        className="glass-card p-8 sm:p-12 border-2 border-primary-500/30 relative bg-white dark:bg-slate-900 shadow-2xl"
      >
        {/* Top Watermark & Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b-2 border-slate-200 dark:border-slate-800 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                {INSTITUTE_NAME}
              </h1>
              <p className="text-xs text-slate-500 max-w-sm mt-0.5">
                {INSTITUTE_ADDRESS}
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-1">
                Admissions Hotline: {INSTITUTE_PHONE}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              STATUS: {receipt.status.toUpperCase()}
            </span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-3">
              {receipt.receiptNo}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              ID: {receipt.paymentId}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="py-6 text-center">
          <h2 className="text-xl font-extrabold tracking-wider uppercase text-slate-900 dark:text-white underline decoration-primary-500 decoration-4 underline-offset-8">
            Official Fee Payment Receipt
          </h2>
        </div>

        {/* Receipt Details Table */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 border-b border-slate-200 dark:border-slate-800">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-semibold">Student Name:</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {receipt.studentName}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-semibold">Student ID:</span>
            <span className="font-extrabold text-primary-600 dark:text-primary-400 font-mono">
              {receipt.studentId}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-semibold">Class / Level:</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {receipt.classLevel}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-semibold">Course Enrolled:</span>
            <span className="font-extrabold text-slate-900 dark:text-white truncate max-w-xs">
              {receipt.courseName}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-semibold">Fee Type:</span>
            <span className="font-extrabold text-secondary-600 dark:text-secondary-400">
              {receipt.feeType} Full Fee
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-semibold">Payment Method:</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {receipt.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between text-sm md:col-span-2">
            <span className="text-slate-500 font-semibold">Transaction Date &amp; Time:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {formatDateTime(receipt.transactionDate)}
            </span>
          </div>
        </div>

        {/* Amount Paid Box */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-950/40 dark:to-indigo-950/40 border border-primary-200 dark:border-primary-800/60 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
              TOTAL AMOUNT PAID
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              All taxes and tuition fees included
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-primary-700 dark:text-primary-300">
            {formatCurrency(receipt.amount)}
          </div>
        </div>

        {/* Authorized Signature & Stamp Area */}
        <div className="pt-10 grid grid-cols-2 gap-8 items-end text-center">
          <div>
            <div className="h-16 flex items-end justify-center pb-2">
              <span className="font-signature text-2xl italic font-bold text-primary-800 dark:text-primary-300">
                Rakesh Sir
              </span>
            </div>
            <div className="border-t-2 border-slate-400 dark:border-slate-600 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              Authorized Signature (Accounts Desk)
            </div>
          </div>

          <div>
            <div className="h-16 flex items-center justify-center">
              <div className="w-28 h-12 rounded-full border-2 border-dashed border-primary-600/60 flex items-center justify-center text-[10px] font-extrabold text-primary-600 uppercase tracking-wider rotate-[-6deg] bg-primary-500/5">
                SARTHAK INSTITUTE • SEAL
              </div>
            </div>
            <div className="border-t-2 border-slate-400 dark:border-slate-600 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              Institute Official Stamp Area
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-[11px] text-slate-400 italic">
          This is an electronically generated receipt by Sarthak Institute Coaching Management System. For queries, email accounts@sarthakinstitute.edu.in.
        </div>
      </div>
    </div>
  );
};

export default Receipt;
