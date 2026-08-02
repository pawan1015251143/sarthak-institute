const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/results
const getResults = async (req, res, next) => {
  try {
    let list = [];
    const studentId = req.user ? req.user.studentId : 'SI20261042';

    if (getIsMock()) {
      if (req.user && req.user.role === 'ADMIN') {
        list = mockDatabaseStore.test_attempts || [];
      } else {
        list = (mockDatabaseStore.test_attempts || []).filter(
          (a) => a.studentId === studentId
        );
      }
    } else {
      if (req.user && req.user.role === 'ADMIN') {
        const [rows] = await pool.query('SELECT * FROM test_attempts ORDER BY id DESC');
        list = rows;
      } else {
        const [rows] = await pool.query(
          'SELECT * FROM test_attempts WHERE student_id = ? ORDER BY id DESC',
          [studentId]
        );
        list = rows;
      }
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

// POST /api/results/submit
const submitTestAttempt = async (req, res, next) => {
  try {
    const { testId, answers } = req.body;
    const studentId = req.user ? req.user.studentId : 'SI20261042';

    let testObj = null;
    if (getIsMock()) {
      testObj = mockDatabaseStore.tests.find((t) => t.id === Number(testId));
    } else {
      const [rows] = await pool.query('SELECT * FROM online_tests WHERE id = ?', [testId]);
      if (rows.length > 0) {
        testObj = rows[0];
        const [qRows] = await pool.query('SELECT * FROM test_questions WHERE test_id = ?', [testId]);
        testObj.questions = qRows;
      }
    }

    if (!testObj) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    let correctCount = 0;
    let wrongCount = 0;

    const questions = testObj.questions || [];
    questions.forEach((q, idx) => {
      const studentAns = answers ? answers[idx] : undefined;
      const correctIdx = q.correctIndex !== undefined ? q.correctIndex : q.correct_index;
      if (studentAns !== undefined && studentAns !== null) {
        if (Number(studentAns) === Number(correctIdx)) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const totalQuestions = questions.length || 10;
    const marksPerQuestion = 4;
    const totalMarks = totalQuestions * marksPerQuestion;
    const negativeValue = testObj.negativeMarking ? 1 : 0;
    const score = Math.max(0, correctCount * marksPerQuestion - wrongCount * negativeValue);
    const percentage = ((score / totalMarks) * 100).toFixed(1);
    const rankVal = Math.floor(1 + Math.random() * 5); // simulated rank among cohort

    const attemptObj = {
      id: Date.now(),
      testId: Number(testId),
      testTitle: testObj.title,
      studentId: studentId,
      score: score,
      totalMarks: totalMarks,
      percentage: Number(percentage),
      rank: rankVal,
      correctCount: correctCount,
      wrongCount: wrongCount,
      attemptDate: new Date().toISOString(),
    };

    if (getIsMock()) {
      if (!mockDatabaseStore.test_attempts) {
        mockDatabaseStore.test_attempts = [];
      }
      mockDatabaseStore.test_attempts.push(attemptObj);
    } else {
      await pool.query(
        `INSERT INTO test_attempts (test_id, test_title, student_id, score, total_marks, percentage, rank_val, correct_count, wrong_count, answers_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          attemptObj.testId,
          attemptObj.testTitle,
          attemptObj.studentId,
          attemptObj.score,
          attemptObj.totalMarks,
          attemptObj.percentage,
          attemptObj.rank,
          attemptObj.correctCount,
          attemptObj.wrongCount,
          JSON.stringify(answers || {}),
        ]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Test submitted and score evaluated successfully.',
      result: attemptObj,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getResults,
  submitTestAttempt,
};
