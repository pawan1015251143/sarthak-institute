const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/notes
const getNotes = async (req, res, next) => {
  try {
    const { classLevel, subject } = req.query;
    let list = [];

    if (getIsMock()) {
      list = mockDatabaseStore.notes;
      if (classLevel && classLevel !== 'All Classes') {
        list = list.filter((n) => n.class_level === classLevel);
      }
      if (subject && subject !== 'All Subjects') {
        list = list.filter((n) => n.subject === subject);
      }
    } else {
      let query = 'SELECT * FROM notes WHERE 1=1';
      const params = [];
      if (classLevel && classLevel !== 'All Classes') {
        query += ' AND class_level = ?';
        params.push(classLevel);
      }
      if (subject && subject !== 'All Subjects') {
        query += ' AND subject = ?';
        params.push(subject);
      }
      const [rows] = await pool.query(query, params);
      list = rows;
    }

    const formatted = list.map((n) => ({
      id: n.id,
      title: n.title,
      classLevel: n.class_level,
      subject: n.subject,
      chapter: n.chapter,
      fileSize: n.file_size || '2.4 MB',
      pdfUrl: n.file_url,
      uploadedBy: n.uploaded_by || 'Rakesh Sir',
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

// POST /api/notes (Admin upload)
const createNote = async (req, res, next) => {
  try {
    const { title, classLevel, subject, chapter, fileSize, uploadedBy } = req.body;
    const fileUrl = req.file ? `/uploads/notes/${req.file.filename}` : '/sample-notes/default-notes.pdf';

    const newNote = {
      id: Date.now(),
      title,
      class_level: classLevel,
      subject,
      chapter,
      file_size: fileSize || '2.5 MB',
      file_url: fileUrl,
      uploaded_by: uploadedBy || (req.user ? req.user.name : 'Rakesh Sir'),
    };

    if (getIsMock()) {
      mockDatabaseStore.notes.unshift(newNote);
    } else {
      await pool.query(
        `INSERT INTO notes (title, class_level, subject, chapter, file_size, file_url, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, classLevel, subject, chapter, newNote.file_size, fileUrl, newNote.uploaded_by]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Study note PDF uploaded successfully.',
      data: {
        id: newNote.id,
        title: newNote.title,
        classLevel: newNote.class_level,
        subject: newNote.subject,
        chapter: newNote.chapter,
        fileSize: newNote.file_size,
        pdfUrl: newNote.file_url,
        uploadedBy: newNote.uploaded_by,
      },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (getIsMock()) {
      mockDatabaseStore.notes = mockDatabaseStore.notes.filter((n) => n.id !== id);
    } else {
      await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Study note deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
};
