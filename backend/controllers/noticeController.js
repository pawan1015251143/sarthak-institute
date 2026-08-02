const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/notices
const getNotices = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockDatabaseStore.notices;
    } else {
      const [rows] = await pool.query('SELECT * FROM notices ORDER BY id DESC');
      list = rows;
    }

    const formatted = list.map((n) => ({
      id: n.id,
      title: n.title,
      category: n.category || 'Examination',
      date: n.date_str || '28 Jul 2026',
      desc: n.desc_text || n.desc || '',
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

// POST /api/notices (Admin only)
const createNotice = async (req, res, next) => {
  try {
    const { title, category, desc } = req.body;
    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newNotice = {
      id: Date.now(),
      title,
      category: category || 'General',
      date_str: dateStr,
      desc_text: desc || '',
    };

    if (getIsMock()) {
      mockDatabaseStore.notices.unshift(newNotice);
    } else {
      await pool.query(
        'INSERT INTO notices (title, category, date_str, desc_text) VALUES (?, ?, ?, ?)',
        [title, category, dateStr, desc]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Notice posted successfully.',
      data: {
        id: newNotice.id,
        title: newNotice.title,
        category: newNotice.category,
        date: newNotice.date_str,
        desc: newNotice.desc_text,
      },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notices/:id
const deleteNotice = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (getIsMock()) {
      mockDatabaseStore.notices = mockDatabaseStore.notices.filter((n) => n.id !== id);
    } else {
      await pool.query('DELETE FROM notices WHERE id = ?', [id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Notice deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};
