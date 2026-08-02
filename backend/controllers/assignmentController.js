const { pool, getIsMock } = require('../config/db');

let mockAssignments = [
  {
    id: 1,
    title: 'Class 12 Physics – Electrostatics Comprehensive Problem Sheet',
    subject: 'Physics',
    dueDate: '10 Aug 2026',
    desc: 'Contains 30 JEE Advanced level objective and subjective numericals.',
    pdfUrl: '/sample-notes/physics-assign1.pdf',
  },
  {
    id: 2,
    title: 'Class 12 Mathematics – Relations & Functions Practice Sheet',
    subject: 'Mathematics',
    dueDate: '12 Aug 2026',
    desc: '25 equivalence relation proofs and subjective function problems.',
    pdfUrl: '/sample-notes/maths-assign1.pdf',
  },
];

// GET /api/assignments
const getAssignments = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockAssignments;
    } else {
      const [rows] = await pool.query('SELECT * FROM assignments ORDER BY id DESC');
      list = rows;
    }

    const formatted = list.map((a) => ({
      id: a.id,
      title: a.title,
      subject: a.subject,
      dueDate: a.due_date || a.dueDate,
      desc: a.desc_text || a.desc,
      pdfUrl: a.pdf_url || a.pdfUrl,
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

// POST /api/assignments
const createAssignment = async (req, res, next) => {
  try {
    const { title, subject, classLevel, desc, dueDate } = req.body;
    const pdfUrl = req.file ? `/uploads/notes/${req.file.filename}` : '/sample-notes/default-assign.pdf';

    const newAsn = {
      id: Date.now(),
      title,
      subject,
      classLevel: classLevel || 'Class 12',
      desc,
      dueDate: dueDate || '15 Aug 2026',
      pdfUrl,
    };

    if (getIsMock()) {
      mockAssignments.unshift(newAsn);
    } else {
      await pool.query(
        'INSERT INTO assignments (title, subject, class_level, desc_text, due_date, pdf_url) VALUES (?, ?, ?, ?, ?, ?)',
        [title, subject, classLevel, desc, dueDate, pdfUrl]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Assignment uploaded successfully.',
      data: newAsn,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAssignments,
  createAssignment,
};
