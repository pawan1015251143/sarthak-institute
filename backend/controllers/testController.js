const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/tests
const getTests = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockDatabaseStore.tests;
    } else {
      const [rows] = await pool.query('SELECT * FROM online_tests ORDER BY id DESC');
      for (let test of rows) {
        const [qRows] = await pool.query('SELECT * FROM test_questions WHERE test_id = ?', [test.id]);
        test.questions = qRows.map((q) => ({
          id: q.id,
          question: q.question_text,
          options: typeof q.options_json === 'string' ? JSON.parse(q.options_json) : q.options_json,
          correctIndex: q.correct_index,
          explanation: q.explanation,
        }));
      }
      list = rows;
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/tests (Admin only)
const createTest = async (req, res, next) => {
  try {
    const { title, classLevel, subject, durationMinutes, totalQuestions, negativeMarking, questions } = req.body;

    const newTest = {
      id: Date.now(),
      title,
      classLevel: classLevel || 'Class 12',
      subject: subject || 'Mathematics',
      durationMinutes: Number(durationMinutes) || 30,
      totalQuestions: Number(totalQuestions) || (Array.isArray(questions) ? questions.length : 10),
      negativeMarking: negativeMarking !== false,
      negativeMarkValue: 0.25,
      questions: Array.isArray(questions) ? questions : [],
    };

    if (getIsMock()) {
      mockDatabaseStore.tests.unshift(newTest);
    } else {
      const [resObj] = await pool.query(
        `INSERT INTO online_tests (title, class_level, subject, duration_minutes, total_questions, negative_marking) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, newTest.classLevel, newTest.subject, newTest.durationMinutes, newTest.totalQuestions, newTest.negativeMarking]
      );
      const testId = resObj.insertId;
      if (Array.isArray(questions)) {
        for (let q of questions) {
          await pool.query(
            `INSERT INTO test_questions (test_id, question_text, options_json, correct_index, explanation) VALUES (?, ?, ?, ?, ?)`,
            [testId, q.question, JSON.stringify(q.options), q.correctIndex, q.explanation || '']
          );
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Online test created successfully.',
      data: newTest,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tests/:id
const deleteTest = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (getIsMock()) {
      mockDatabaseStore.tests = mockDatabaseStore.tests.filter((t) => t.id !== id);
    } else {
      await pool.query('DELETE FROM online_tests WHERE id = ?', [id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Test deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTests,
  createTest,
  deleteTest,
};
