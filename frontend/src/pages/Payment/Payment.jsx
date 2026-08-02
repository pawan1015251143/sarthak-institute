import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COURSES_DATA } from '../../utils/constants';
import { formatCurrency, generateReceiptNumber, generatePaymentId } from '../../utils/helpers';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const Payment = () => {
  const { user } = useAuth();
  const { addPaymentReceipt } = useUser();
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState(COURSES_DATA[0] || {});
  const [feeType, setFeeType] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [studentNameInput, setStudentNameInput] = useState(user?.name || 'Arjun Verma');
  const [studentIdInput, setStudentIdInput] = useState(user?.studentId || 'SI20261042');

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const amount =
      feeType === 'Monthly'
        ? selectedCourse.feeMonthly
        : selectedCourse.feeYearly;

    const receiptObj = {
      receiptNo: generateReceiptNumber(),
      paymentId: generatePaymentId(),
      studentName: studentNameInput,
      studentId: studentIdInput,
      classLevel: selectedCourse.classLevel,
      courseName: selectedCourse.title,
      feeType: feeType,
      amount: amount,
      paymentMethod: paymentMethod,
      transactionDate: new Date().toISOString(),
      status: 'Paid',
    };

    addPaymentReceipt(receiptObj);
    navigate('/receipt', { state: { receipt: receiptObj } });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="text-center">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          SECURE FEE CHECKOUT
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Pay Tuition Fee &amp; Generate Instant Receipt
        </h1>
      </div>

      <div className="glass-card p-8 shadow-xl border-2 border-primary-500/20">
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student ID *
              </label>
              <input
                type="text"
                required
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Course *
            </label>
            <select
              value={selectedCourse.id}
              onChange={(e) =>
                setSelectedCourse(
                  COURSES_DATA.find((c) => c.id === Number(e.target.value))
                )
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
            >
              {COURSES_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.classLevel} - {c.stream})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Select Fee Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFeeType('Monthly')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  feeType === 'Monthly'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs">Monthly Installment</div>
                <div className="text-lg font-extrabold">
                  {formatCurrency(selectedCourse.feeMonthly)}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFeeType('Yearly')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  feeType === 'Yearly'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs">Yearly Full Fee</div>
                <div className="text-lg font-extrabold">
                  {formatCurrency(selectedCourse.feeYearly)}
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Payment Method *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['UPI', 'Cash', 'Bank Transfer'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2.5 px-3 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                    paymentMethod === m
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="btn-primary w-full py-4 text-base">
              <span>Complete Payment &amp; Download Receipt</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
