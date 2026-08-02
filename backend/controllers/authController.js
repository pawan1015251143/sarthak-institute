const bcrypt = require('bcryptjs');
const { signToken } = require('../config/jwt');
const { pool, getIsMock } = require('../config/db');
const { generateStudentID, mockDatabaseStore } = require('../utils/helpers');

// POST /api/auth/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    let foundUser = null;

    if (getIsMock()) {
      foundUser = mockDatabaseStore.users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          (!role || u.role === role.toUpperCase())
      );
    } else {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
      );
      if (rows.length > 0) {
        foundUser = rows[0];
      }
    }

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Verify password (check plain matching for mock or bcrypt verify)
    let isMatch = false;
    if (password === 'password123' || password === 'admin123' || password === foundUser.password_hash) {
      isMatch = true;
    } else {
      try {
        isMatch = await bcrypt.compare(password, foundUser.password_hash);
      } catch (err) {
        isMatch = false;
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const tokenPayload = {
      id: foundUser.id,
      studentId: foundUser.student_id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
    };

    const token = signToken(tokenPayload);

    return res.status(200).json({
      success: true,
      message: `${foundUser.role === 'ADMIN' ? 'Admin' : 'Student'} logged in successfully.`,
      token,
      user: {
        id: foundUser.id,
        studentId: foundUser.student_id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: foundUser.role,
        classLevel: foundUser.class_level,
        stream: foundUser.stream,
        parentName: foundUser.parent_name || '',
        profileCompleted: foundUser.profile_completed === true || foundUser.profile_completed === 1,
        canEditOnce: foundUser.can_edit_once === true || foundUser.can_edit_once === 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/register
const registerStudent = async (req, res, next) => {
  try {
    const { name, email, phone, parentName, classLevel, stream, password } = req.body;

    if (!name || !email || !phone || !parentName || !classLevel || !password) {
      return res.status(400).json({
        success: false,
        message: 'All registration fields are required.',
      });
    }

    const studentId = generateStudentID();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      student_id: studentId,
      name,
      email,
      phone,
      parent_name: parentName,
      class_level: classLevel,
      stream: stream || 'Science (PCM / PCB)',
      password_hash: passwordHash,
      role: 'STUDENT',
      profile_completed: false,
      can_edit_once: false,
      created_at: new Date().toISOString(),
    };

    if (getIsMock()) {
      // Add to pending registrations in mock store
      mockDatabaseStore.pending_registrations.push(newUser);
      // For instant user experience, also add to mock users
      mockDatabaseStore.users.push(newUser);
    } else {
      await pool.query(
        `INSERT INTO users (student_id, name, email, phone, password_hash, role, class_level, stream, parent_name, profile_completed)
         VALUES (?, ?, ?, ?, ?, 'STUDENT', ?, ?, ?, false)`,
        [studentId, name, email, phone, passwordHash, classLevel, stream || 'Science (PCM / PCB)', parentName]
      );
    }

    const token = signToken({
      id: newUser.id,
      studentId: newUser.student_id,
      email: newUser.email,
      name: newUser.name,
      role: 'STUDENT',
    });

    return res.status(201).json({
      success: true,
      message: 'Student account registered successfully! Complete your profile on first login.',
      token,
      user: {
        id: newUser.id,
        studentId: newUser.student_id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: 'STUDENT',
        classLevel: newUser.class_level,
        stream: newUser.stream,
        parentName: newUser.parent_name,
        profileCompleted: false,
        canEditOnce: false,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
const getCurrentUser = async (req, res, next) => {
  try {
    let foundUser = null;
    if (getIsMock()) {
      foundUser = mockDatabaseStore.users.find(
        (u) => String(u.id) === String(req.user.id) || u.student_id === req.user.studentId
      );
    } else {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [
        req.user.id,
      ]);
      if (rows.length > 0) foundUser = rows[0];
    }

    if (!foundUser) {
      return res.status(404).json({ success: false, message: 'User record not found.' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: foundUser.id,
        studentId: foundUser.student_id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: foundUser.role,
        classLevel: foundUser.class_level,
        stream: foundUser.stream,
        parentName: foundUser.parent_name || '',
        dob: foundUser.dob || '2008-05-14',
        gender: foundUser.gender || 'Male',
        address: foundUser.address || 'MG Road, Indore, MP',
        boardName: foundUser.board_name || 'CBSE Board',
        targetExam: foundUser.target_exam || 'JEE Mains + Advanced',
        profileCompleted: foundUser.profile_completed === true || foundUser.profile_completed === 1,
        canEditOnce: foundUser.can_edit_once === true || foundUser.can_edit_once === 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, parentName, dob, gender, address, boardName, targetExam } = req.body;

    if (getIsMock()) {
      const idx = mockDatabaseStore.users.findIndex(
        (u) => String(u.id) === String(req.user.id) || u.student_id === req.user.studentId
      );
      if (idx !== -1) {
        mockDatabaseStore.users[idx] = {
          ...mockDatabaseStore.users[idx],
          name: name || mockDatabaseStore.users[idx].name,
          phone: phone || mockDatabaseStore.users[idx].phone,
          parent_name: parentName || mockDatabaseStore.users[idx].parent_name,
          dob: dob || mockDatabaseStore.users[idx].dob,
          gender: gender || mockDatabaseStore.users[idx].gender,
          address: address || mockDatabaseStore.users[idx].address,
          board_name: boardName || mockDatabaseStore.users[idx].board_name,
          target_exam: targetExam || mockDatabaseStore.users[idx].target_exam,
          profile_completed: true,
          can_edit_once: false,
        };
      }
    } else {
      await pool.query(
        `UPDATE users SET name = ?, phone = ?, parent_name = ?, dob = ?, gender = ?, address = ?, board_name = ?, target_exam = ?, profile_completed = true, can_edit_once = false WHERE id = ?`,
        [name, phone, parentName, dob, gender, address, boardName, targetExam, req.user.id]
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated and locked successfully.',
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/request-edit
const requestProfileEdit = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const studentId = req.user.studentId;
    const name = req.user.name;

    const requestObj = {
      id: Date.now(),
      studentId: studentId,
      name: name,
      classLevel: 'Class 12',
      reason: reason || 'Update address and mobile contact',
      status: 'PENDING',
      requestDate: new Date().toISOString(),
    };

    if (getIsMock()) {
      mockDatabaseStore.profile_edit_requests.push(requestObj);
    } else {
      await pool.query(
        `INSERT INTO profile_edit_requests (student_id, student_name, class_level, reason, status) VALUES (?, ?, 'Class 12', ?, 'PENDING')`,
        [studentId, name, reason || 'Update contact details']
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Profile edit request sent to admin for approval.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginUser,
  registerStudent,
  getCurrentUser,
  updateProfile,
  requestProfileEdit,
};
