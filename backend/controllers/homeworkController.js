const { pool, getIsMock } = require('../config/db');

let mockHomeworks = [
  {
    id: 1,
    title: 'Physics: Chapter 4 Electrostatics Assignment #3',
    subject: 'Physics',
    dueDate: 'Tomorrow 5:00 PM',
    status: 'Pending',
    desc: 'Solve Numerical Problems 1 to 15 from NCERT Exercise 4.2.',
    assignedBy: 'Dr. Arvind Sharma',
  },
  {
    id: 2,
    title: 'Maths: Differential Calculus Practice Set #2',
    subject: 'Mathematics',
    dueDate: '04 Aug 2026',
    status: 'Completed',
    desc: 'Complete derivatives of composite and parametric functions.',
    assignedBy: 'Rakesh Sir',
  },
  {
    id: 3,
    title: 'Chemistry: Electrochemistry Nernst Equation Problems',
    subject: 'Chemistry',
    dueDate: '06 Aug 2026',
    status: 'Pending',
    desc: 'Solve practice worksheet problems on EMF and cell potential calculation.',
    assignedBy: 'Prof. Manish Verma',
  },
];

// GET /api/homework
const getHomeworks = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockHomeworks;
    } else {
      const [rows] = await pool.query('SELECT * FROM homeworks ORDER BY id DESC');
      list = rows;
    }

    const formatted = list.map((h) => ({
      id: h.id,
      title: h.title,
      subject: h.subject,
      dueDate: h.due_date || h.dueDate,
      status: h.status || 'Pending',
      desc: h.desc_text || h.desc,
      assignedBy: h.assigned_by || h.assignedBy || 'Rakesh Sir',
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/homework (Admin only)
const createHomework = async (req, res, next) => {
  try {
    const { title, subject, classLevel, desc, dueDate } = req.body;

    const newHw = {
      id: Date.now(),
      title,
      subject,
      classLevel: classLevel || 'Class 12',
      desc,
      dueDate: dueDate || 'Next Monday',
      status: 'Pending',
      assignedBy: req.user ? req.user.name : 'Rakesh Sir',
    };

    if (getIsMock()) {
      mockHomeworks.unshift(newHw);
    } else {
      await pool.query(
        'INSERT INTO homeworks (title, subject, class_level, desc_text, due_date, assigned_by) VALUES (?, ?, ?, ?, ?, ?)',
        [title, subject, classLevel, desc, dueDate, newHw.assignedBy]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Homework assigned successfully.',
      data: newHw,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHomeworks,
  createHomework,
};
