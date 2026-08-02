const { pool, getIsMock } = require('../config/db');
const {
  generateReceiptNumber,
  generatePaymentId,
  mockDatabaseStore,
} = require('../utils/helpers');

// POST /api/fees/pay
const processFeePayment = async (req, res, next) => {
  try {
    const {
      studentName,
      studentId,
      classLevel,
      courseName,
      feeType,
      amount,
      paymentMethod,
    } = req.body;

    const receiptNo = generateReceiptNumber();
    const paymentId = generatePaymentId();

    const receiptObj = {
      id: Date.now(),
      receipt_no: receiptNo,
      payment_id: paymentId,
      student_id: studentId || (req.user ? req.user.studentId : 'SI20261042'),
      student_name: studentName || (req.user ? req.user.name : 'Student'),
      class_level: classLevel || 'Class 12',
      course_name: courseName || 'Class 12 Science',
      fee_type: feeType || 'Monthly',
      amount: Number(amount) || 4200,
      payment_method: paymentMethod || 'UPI',
      transaction_date: new Date().toISOString(),
      status: 'Paid',
    };

    if (getIsMock()) {
      mockDatabaseStore.receipts.unshift(receiptObj);
    } else {
      await pool.query(
        `INSERT INTO payment_receipts (receipt_no, payment_id, student_id, student_name, class_level, course_name, fee_type, amount, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Paid')`,
        [
          receiptNo,
          paymentId,
          receiptObj.student_id,
          receiptObj.student_name,
          receiptObj.class_level,
          receiptObj.course_name,
          receiptObj.fee_type,
          receiptObj.amount,
          receiptObj.payment_method,
        ]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Fee payment processed and official receipt generated successfully!',
      receipt: {
        receiptNo: receiptObj.receipt_no,
        paymentId: receiptObj.payment_id,
        studentName: receiptObj.student_name,
        studentId: receiptObj.student_id,
        classLevel: receiptObj.class_level,
        courseName: receiptObj.course_name,
        feeType: receiptObj.fee_type,
        amount: receiptObj.amount,
        paymentMethod: receiptObj.payment_method,
        transactionDate: receiptObj.transaction_date,
        status: receiptObj.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/fees/receipts
const getReceipts = async (req, res, next) => {
  try {
    let list = [];
    if (getIsMock()) {
      if (req.user && req.user.role === 'ADMIN') {
        list = mockDatabaseStore.receipts;
      } else {
        list = mockDatabaseStore.receipts.filter(
          (r) => r.student_id === (req.user ? req.user.studentId : 'SI20261042')
        );
      }
    } else {
      if (req.user && req.user.role === 'ADMIN') {
        const [rows] = await pool.query('SELECT * FROM payment_receipts ORDER BY id DESC');
        list = rows;
      } else {
        const [rows] = await pool.query(
          'SELECT * FROM payment_receipts WHERE student_id = ? ORDER BY id DESC',
          [req.user ? req.user.studentId : 'SI20261042']
        );
        list = rows;
      }
    }

    // Format fields for frontend compatibility
    const formatted = list.map((r) => ({
      receiptNo: r.receipt_no,
      paymentId: r.payment_id,
      studentName: r.student_name,
      studentId: r.student_id,
      classLevel: r.class_level,
      courseName: r.course_name,
      feeType: r.fee_type,
      amount: r.amount,
      paymentMethod: r.payment_method,
      transactionDate: r.transaction_date,
      status: r.status,
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

module.exports = {
  processFeePayment,
  getReceipts,
};
