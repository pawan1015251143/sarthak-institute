const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/courses
const getCourses = async (req, res, next) => {
  try {
    const { classLevel, stream } = req.query;

    let coursesList = [];
    if (getIsMock()) {
      coursesList = mockDatabaseStore.courses;
      if (classLevel && classLevel !== 'All') {
        coursesList = coursesList.filter((c) => c.class_level === classLevel);
      }
    } else {
      const [rows] = await pool.query('SELECT * FROM courses ORDER BY id ASC');
      coursesList = rows;
    }

    return res.status(200).json({
      success: true,
      count: coursesList.length,
      data: coursesList,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/courses/:id
const getCourseById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    let course = null;

    if (getIsMock()) {
      course = mockDatabaseStore.courses.find((c) => c.id === id);
    } else {
      const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
      if (rows.length > 0) course = rows[0];
    }

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/courses (Admin only)
const createCourse = async (req, res, next) => {
  try {
    const { title, classLevel, stream, duration, feeMonthly, feeYearly, subjects, description } = req.body;

    const newCourse = {
      id: Date.now(),
      title,
      class_level: classLevel,
      stream,
      duration,
      fee_monthly: Number(feeMonthly),
      fee_yearly: Number(feeYearly),
      subjects: Array.isArray(subjects) ? subjects : ['Physics', 'Chemistry', 'Mathematics'],
      description: description || '',
    };

    if (getIsMock()) {
      mockDatabaseStore.courses.push(newCourse);
    } else {
      await pool.query(
        `INSERT INTO courses (title, class_level, stream, duration, fee_monthly, fee_yearly, subjects_json, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, classLevel, stream, duration, Number(feeMonthly), Number(feeYearly), JSON.stringify(newCourse.subjects), description]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Course created successfully.',
      data: newCourse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
};
