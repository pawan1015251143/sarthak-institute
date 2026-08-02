const { pool, getIsMock } = require('../config/db');

// In-memory mock attendance
let mockAttendance = {
  studentId: 'SI20261042',
  totalDays: 45,
  presentDays: 42,
  absentDays: 3,
  records: [
    { date: '30 Jul 2026', status: 'Present', subject: 'Physics Lecture' },
    { date: '29 Jul 2026', status: 'Present', subject: 'Chemistry Lecture' },
    { date: '28 Jul 2026', status: 'Present', subject: 'Mathematics Lecture' },
    { date: '27 Jul 2026', status: 'Absent', subject: 'Medical Leave / Approved' },
  ],
};

// GET /api/attendance
const getAttendance = async (req, res, next) => {
  try {
    const studentId = req.user ? req.user.studentId : 'SI20261042';

    if (getIsMock()) {
      return res.status(200).json({
        success: true,
        data: mockAttendance,
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC LIMIT 30',
      [studentId]
    );

    const presentDays = rows.filter((r) => r.status === 'Present').length;
    const absentDays = rows.filter((r) => r.status === 'Absent').length;

    return res.status(200).json({
      success: true,
      data: {
        studentId,
        totalDays: rows.length || 1,
        presentDays: presentDays || 1,
        absentDays: absentDays || 0,
        records: rows.map((r) => ({
          date: r.date,
          status: r.status,
          subject: r.subject || 'Core Lecture',
        })),
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/attendance
const recordAttendance = async (req, res, next) => {
  try {
    const { studentId, date, status, subject } = req.body;

    if (getIsMock()) {
      mockAttendance.records.unshift({
        date: date || 'Today',
        status: status || 'Present',
        subject: subject || 'Class Lecture',
      });
      if (status === 'Present') mockAttendance.presentDays++;
      else mockAttendance.absentDays++;
      mockAttendance.totalDays++;
    } else {
      await pool.query(
        'INSERT INTO attendance (student_id, date, status, subject) VALUES (?, ?, ?, ?)',
        [studentId, date, status || 'Present', subject || 'Class Lecture']
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAttendance,
  recordAttendance,
};
