import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { COURSES_DATA, SAMPLE_STUDENT } from '../../utils/constants';
import { formatCurrency, generateReceiptNumber, generatePaymentId } from '../../utils/helpers';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import {
  CreditCard,
  CheckCircle2,
  DollarSign,
  Smartphone,
  Banknote,
  Building2,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';

const FeeStructure = () => {
  const [selectedCourse, setSelectedCourse] = useState(COURSES_DATA[0] || {}); // default Class 10 Bihar Board
  const [feeType, setFeeType] = useState('Yearly'); // 'Monthly' or 'Yearly'
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Cash', 'Bank Transfer'
  const [modalOpen, setModalOpen] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState(SAMPLE_STUDENT.name);
  const [studentIdInput, setStudentIdInput] = useState(SAMPLE_STUDENT.studentId);

  const { addPaymentReceipt } = useUser();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayNow = (course) => {
    setSelectedCourse(course);
    if (user) {
      setStudentNameInput(user.name);
      setStudentIdInput(user.studentId);
    }
    setModalOpen(true);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    const amount =
      feeType === 'Monthly'
        ? selectedCourse?.feeMonthly || 0
        : selectedCourse?.feeYearly || 0;

    const receiptObj = {
      receiptNo: generateReceiptNumber(),
      paymentId: generatePaymentId(),
      studentName: studentNameInput || "Student Name",
      studentId: studentIdInput || "SI20260000",
      classLevel: selectedCourse?.classLevel || "Class 10",
      courseName: selectedCourse?.title || "Bihar Board Course",
      feeType: feeType,
      amount: amount,
      paymentMethod: paymentMethod,
      transactionDate: new Date().toISOString(),
      status: "Paid",
    };

    addPaymentReceipt(receiptObj);
    setModalOpen(false);
    navigate('/receipt', { state: { receipt: receiptObj } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          TRANSPARENT FEE STRUCTURE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Fee Structure &amp; Payment Options
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base">
          Choose between simple Monthly installments or discounted Yearly full fee payments.
        </p>
      </div>

      {/* Fee Table - Displays Only Monthly Fee and Yearly Fee */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Class &amp; Course</th>
                <th className="px-6 py-4">Stream</th>
                <th className="px-6 py-4">Monthly Fee</th>
                <th className="px-6 py-4">Yearly Fee</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {COURSES_DATA.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                    {c.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {c.stream}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-primary-600 dark:text-primary-400">
                    {formatCurrency(c.feeMonthly)}
                    <span className="text-xs font-normal text-slate-500"> / month</span>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                    {formatCurrency(c.feeYearly)}
                    <span className="text-xs font-normal text-slate-500"> / year</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handlePayNow(c)}
                      className="btn-primary py-2 px-4 text-xs"
                    >
                      <span>Pay Online</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods - UPI, Cash, Bank Transfer */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Supported Payment Methods
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Fast, secure, and automated receipt generation immediately upon transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* UPI */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-4 border-2 border-primary-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  UPI (Instant)
                </h3>
                <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                  GPay • PhonePe • Paytm • BHIM
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Pay via any UPI app. Upon confirmation, your receipt is generated instantly with an official payment ID.
            </p>
            <div className="text-xs font-bold text-slate-500">
              UPI ID: <span className="text-slate-800 dark:text-slate-200">sarthak@icici</span>
            </div>
          </div>

          {/* Cash */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-950 text-secondary-600 dark:text-secondary-400 flex items-center justify-center">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Cash at Counter
                </h3>
                <span className="text-xs text-secondary-600 dark:text-secondary-400 font-semibold">
                  Institute Campus Office
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Deposit cash directly at the Sarthak Institute accounts desk. A computerized receipt with stamp will be handed over immediately.
            </p>
            <div className="text-xs font-bold text-slate-500">
              Timing: <span className="text-slate-800 dark:text-slate-200">9:00 AM - 7:00 PM</span>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Bank Transfer (NEFT/RTGS)
                </h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Direct Account Credit
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Transfer tuition fee directly to the institute's bank account. Share the UTR number to download your receipt.
            </p>
            <div className="text-xs font-bold text-slate-500">
              A/C: <span className="text-slate-800 dark:text-slate-200">50200083491024 (HDFC Bank)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Processing Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Complete Fee Payment & Generate Receipt"
      >
        <form onSubmit={handleConfirmPayment} className="space-y-5">
          <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">
                Course Selected
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                {selectedCourse.title}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Total Payable</div>
              <div className="text-xl font-extrabold text-primary-600 dark:text-primary-400">
                {formatCurrency(
                  feeType === 'Monthly'
                    ? selectedCourse.feeMonthly
                    : selectedCourse.feeYearly
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student Name
              </label>
              <input
                type="text"
                required
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student ID
              </label>
              <input
                type="text"
                required
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Fee Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Select Fee Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFeeType('Monthly')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  feeType === 'Monthly'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs">Monthly Installment</div>
                <div className="text-base font-extrabold">
                  {formatCurrency(selectedCourse?.feeMonthly || 0)}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFeeType('Yearly')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  feeType === 'Yearly'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs">Yearly Full Fee</div>
                <div className="text-base font-extrabold">
                  {formatCurrency(selectedCourse?.feeYearly || 0)}
                </div>
              </button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['UPI', 'Cash', 'Bank Transfer'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2 px-3 rounded-xl border-2 text-center text-xs font-bold transition-all ${
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
            <button type="submit" className="btn-primary w-full py-3">
              <span>Complete Payment &amp; Generate Receipt</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FeeStructure;
