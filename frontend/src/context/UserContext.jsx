import React, { createContext, useContext, useState } from 'react';
import { SAMPLE_STUDENT, NOTICE_BOARD_DATA, SAMPLE_NOTES, SAMPLE_TESTS } from '../utils/constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('sarthak_payments');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // ignore storage parse errors
    }
    return [
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
    try {
      const saved = localStorage.getItem('sarthak_test_attempts');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // ignore storage parse errors
    }
    return [
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

  const [pendingRegistrations, setPendingRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem('sarthak_pending_regs');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [
      {
        id: 'reg-101',
        name: 'Rohan Sharma',
        fatherName: 'Suresh Sharma',
        phone: '9876543210',
        classLevel: 'Class 11',
        courseName: 'IIT-JEE Foundation',
        regDate: '2026-08-04',
      },
      {
        id: 'reg-102',
        name: 'Priya Verma',
        fatherName: 'Rajesh Verma',
        phone: '9123456789',
        classLevel: 'Class 12',
        courseName: 'NEET Target',
        regDate: '2026-08-03',
      },
    ];
  });

  const [profileEditRequests, setProfileEditRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('sarthak_profile_edits');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [
      {
        id: 'edit-201',
        studentId: 'SAR-2026-001',
        name: 'Arjun Verma',
        field: 'Phone Number',
        oldValue: '9876543210',
        newValue: '9988776655',
        requestDate: '2026-08-02',
      },
    ];
  });

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem('sarthak_announcements');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [
      {
        id: 'ann-1',
        title: 'Crash Course for JEE 2027',
        badge: 'NEW BATCH',
        desc: 'Special crash course starting from September 1st under Rakesh Sir guidance.',
      },
      {
        id: 'ann-2',
        title: 'Scholarship Test Registration Open',
        badge: 'SCHOLARSHIP',
        desc: 'Up to 90% scholarship for Class 10 & 11 students.',
      },
    ];
  });

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

  const approveRegistration = (id) => {
    setPendingRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  const rejectRegistration = (id) => {
    setPendingRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  const approveProfileEdit = (id) => {
    setProfileEditRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const rejectProfileEdit = (id) => {
    setProfileEditRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const addTest = (test) => {
    setTests((prev) => [test, ...prev]);
  };

  const deleteTest = (id) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  const addNotice = (notice) => {
    setNotices((prev) => [notice, ...prev]);
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const addAnnouncement = (ann) => {
    setAnnouncements((prev) => [ann, ...prev]);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        payments,
        paymentReceipts: payments,
        addPaymentReceipt,
        testAttempts,
        addTestAttempt,
        notes,
        setNotes,
        addNote,
        deleteNote,
        tests,
        setTests,
        addTest,
        deleteTest,
        pendingRegistrations,
        approveRegistration,
        rejectRegistration,
        profileEditRequests,
        approveProfileEdit,
        rejectProfileEdit,
        notices,
        setNotices,
        addNotice,
        deleteNotice,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
