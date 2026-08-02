import React, { createContext, useContext, useState } from 'react';
import { SAMPLE_STUDENT, NOTICE_BOARD_DATA, SAMPLE_NOTES, SAMPLE_TESTS } from '../utils/constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('sarthak_payments');
    return saved
      ? JSON.parse(saved)
      : [
          {
            receiptNo: "REC-2026-834912",
            paymentId: "PAY_9K2L8X1M0Q",
            studentName: SAMPLE_STUDENT.name,
            studentId: SAMPLE_STUDENT.studentId,
            classLevel: SAMPLE_STUDENT.classLevel,
            courseName: SAMPLE_STUDENT.courseName,
            feeType: "Yearly",
            amount: 40000,
            paymentMethod: "UPI",
            transactionDate: "2026-07-05T14:22:00",
            status: "Paid",
          },
        ];
  });

  const [testAttempts, setTestAttempts] = useState(() => {
    const saved = localStorage.getItem('sarthak_test_attempts');
    return saved
      ? JSON.parse(saved)
      : [
          {
            testId: "test-101",
            testTitle: "Class 12 Mathematics - Matrices & Determinants Mega Test",
            score: 4.75,
            totalMarks: 5,
            percentage: 95,
            rank: 2,
            attemptDate: "2026-07-22T10:15:00",
            correctCount: 5,
            wrongCount: 0,
          },
        ];
  });

  const [notes, setNotes] = useState(SAMPLE_NOTES);
  const [tests, setTests] = useState(SAMPLE_TESTS);
  const [notices, setNotices] = useState(NOTICE_BOARD_DATA);

  const addPaymentReceipt = (receiptData) => {
    const updated = [receiptData, ...payments];
    setPayments(updated);
    localStorage.setItem('sarthak_payments', JSON.stringify(updated));
  };

  const addTestAttempt = (attemptData) => {
    const updated = [attemptData, ...testAttempts];
    setTestAttempts(updated);
    localStorage.setItem('sarthak_test_attempts', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider
      value={{
        payments,
        addPaymentReceipt,
        testAttempts,
        addTestAttempt,
        notes,
        setNotes,
        tests,
        setTests,
        notices,
        setNotices,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
