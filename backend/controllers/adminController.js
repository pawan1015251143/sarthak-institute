const { pool, getIsMock } = require('../config/db');
const { mockDatabaseStore } = require('../utils/helpers');

// GET /api/admin/pending-registrations
const getPendingRegistrations = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockDatabaseStore.pending_registrations || [];
    } else {
      const [rows] = await pool.query(
        "SELECT * FROM pending_registrations WHERE status = 'PENDING_APPROVAL' ORDER BY id DESC"
      );
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

// POST /api/admin/approve-registration/:id
const approveRegistration = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (getIsMock()) {
      mockDatabaseStore.pending_registrations = mockDatabaseStore.pending_registrations.filter(
        (r) => r.id !== id
      );
    } else {
      const [rows] = await pool.query('SELECT * FROM pending_registrations WHERE id = ?', [id]);
      if (rows.length > 0) {
        const reg = rows[0];
        await pool.query(
          `INSERT INTO users (student_id, name, email, phone, password_hash, role, class_level, stream, parent_name, profile_completed) VALUES (?, ?, ?, ?, ?, 'STUDENT', ?, ?, ?, false)`,
          [
            reg.student_id,
            reg.name,
            reg.email,
            reg.phone,
            reg.password_hash,
            reg.class_level,
            reg.stream,
            reg.parent_name,
          ]
        );
        await pool.query("UPDATE pending_registrations SET status = 'APPROVED' WHERE id = ?", [id]);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Student registration approved and user account activated.',
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/reject-registration/:id
const rejectRegistration = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (getIsMock()) {
      mockDatabaseStore.pending_registrations = mockDatabaseStore.pending_registrations.filter(
        (r) => r.id !== id
      );
    } else {
      await pool.query("UPDATE pending_registrations SET status = 'REJECTED' WHERE id = ?", [id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Student registration application rejected.',
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/profile-edit-requests
const getProfileEditRequests = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      list = mockDatabaseStore.profile_edit_requests || [];
    } else {
      const [rows] = await pool.query(
        "SELECT * FROM profile_edit_requests WHERE status = 'PENDING' ORDER BY id DESC"
      );
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

// POST /api/admin/approve-profile-edit/:id
const approveProfileEdit = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (getIsMock()) {
      const reqItem = mockDatabaseStore.profile_edit_requests.find((r) => r.id === id);
      if (reqItem) {
        const u = mockDatabaseStore.users.find((user) => user.student_id === reqItem.studentId);
        if (u) {
          u.can_edit_once = true;
          u.edit_request_status = 'APPROVED';
        }
      }
      mockDatabaseStore.profile_edit_requests = mockDatabaseStore.profile_edit_requests.filter(
        (r) => r.id !== id
      );
    } else {
      const [rows] = await pool.query('SELECT * FROM profile_edit_requests WHERE id = ?', [id]);
      if (rows.length > 0) {
        const studentId = rows[0].student_id;
        await pool.query(
          "UPDATE users SET can_edit_once = true, edit_request_status = 'APPROVED' WHERE student_id = ?",
          [studentId]
        );
        await pool.query("UPDATE profile_edit_requests SET status = 'APPROVED' WHERE id = ?", [id]);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Profile edit approved! Student can now modify their profile exactly once.',
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/reject-profile-edit/:id
const rejectProfileEdit = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (getIsMock()) {
      mockDatabaseStore.profile_edit_requests = mockDatabaseStore.profile_edit_requests.filter(
        (r) => r.id !== id
      );
    } else {
      await pool.query("UPDATE profile_edit_requests SET status = 'REJECTED' WHERE id = ?", [id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Profile edit request rejected.',
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/stats
const getAdminStats = async (req, res, next) => {
  try {
    let stats = {};
    if (getIsMock()) {
      stats = {
        totalStudents: mockDatabaseStore.users.filter((u) => u.role === 'STUDENT').length,
        pendingRegistrations: mockDatabaseStore.pending_registrations.length,
        profileEditRequests: mockDatabaseStore.profile_edit_requests.length,
        totalNotes: mockDatabaseStore.notes.length,
        totalTests: mockDatabaseStore.tests.length,
        totalReceipts: mockDatabaseStore.receipts.length,
      };
    } else {
      const [[usersCnt]] = await pool.query("SELECT COUNT(*) AS c FROM users WHERE role = 'STUDENT'");
      const [[notesCnt]] = await pool.query('SELECT COUNT(*) AS c FROM notes');
      const [[testsCnt]] = await pool.query('SELECT COUNT(*) AS c FROM online_tests');
      const [[recCnt]] = await pool.query('SELECT COUNT(*) AS c FROM payment_receipts');
      stats = {
        totalStudents: usersCnt.c,
        totalNotes: notesCnt.c,
        totalTests: testsCnt.c,
        totalReceipts: recCnt.c,
      };
    }

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPendingRegistrations,
  approveRegistration,
  rejectRegistration,
  getProfileEditRequests,
  approveProfileEdit,
  rejectProfileEdit,
  getAdminStats,
};
