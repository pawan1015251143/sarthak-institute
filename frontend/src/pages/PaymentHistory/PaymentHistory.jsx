import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { FileText, Download, Printer, CheckCircle2 } from 'lucide-react';

const PaymentHistory = () => {
  const { paymentReceipts } = useUser();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            ACADEMIC FINANCIAL RECORD
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Student Payment History &amp; Receipts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            All tuition fee payments recorded with printable PDF receipts.
          </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        {paymentReceipts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Receipt #</th>
                  <th className="px-6 py-4">Course / Level</th>
                  <th className="px-6 py-4">Fee Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {paymentReceipts.map((rec, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-extrabold text-primary-600 dark:text-primary-400 font-mono">
                      {rec.receiptNo}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {rec.courseName}
                    </td>
                    <td className="px-6 py-4">{rec.feeType}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(rec.amount)}
                    </td>
                    <td className="px-6 py-4">{rec.paymentMethod}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDateTime(rec.transactionDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate('/receipt', { state: { receipt: rec } })
                        }
                        className="btn-outline py-1.5 px-3 text-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View / PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 font-semibold">
            No fee payment receipts found. Pay your monthly or yearly fee to generate official receipts.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
