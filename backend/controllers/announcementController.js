const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/announcements
const getAnnouncements = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockDatabaseStore.announcements;
    } else {
      const [rows] = await pool.query('SELECT * FROM announcements ORDER BY id DESC');
      list = rows;
    }

    const formatted = list.map((a) => ({
      id: a.id,
      title: a.title,
      badge: a.badge_tag || 'ADMISSION',
      desc: a.desc_text || a.desc || '',
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

// POST /api/announcements (Admin only)
const createAnnouncement = async (req, res, next) => {
  try {
    const { title, badge, desc } = req.body;

    const newAnn = {
      id: Date.now(),
      title,
      badge_tag: badge || 'NEW BATCH',
      desc_text: desc || '',
    };

    if (getIsMock()) {
      mockDatabaseStore.announcements.unshift(newAnn);
    } else {
      await pool.query(
        'INSERT INTO announcements (title, badge_tag, desc_text) VALUES (?, ?, ?)',
        [title, badge, desc]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Announcement posted successfully.',
      data: {
        id: newAnn.id,
        title: newAnn.title,
        badge: newAnn.badge_tag,
        desc: newAnn.desc_text,
      },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/announcements/:id
const deleteAnnouncement = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (getIsMock()) {
      mockDatabaseStore.announcements = mockDatabaseStore.announcements.filter((a) => a.id !== id);
    } else {
      await pool.query('DELETE FROM announcements WHERE id = ?', [id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
};
