const generateStudentID = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `SI${year}${randomNum}`;
};

const generateReceiptNumber = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `REC-${year}-${randomNum}`;
};

const generatePaymentId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'PAY_';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// In-Memory Mock Store for zero-config fallback when local MySQL is offline
const mockDatabaseStore = {
  users: [
    {
      id: 1,
      student_id: 'ADMIN_RAKESH',
      name: 'Rakesh Sir',
      email: 'rakesh.sir@sarthakinstitute.edu.in',
      phone: '+91 98765 43210',
      password_hash: '$2a$10$wE9K.pS.bJ8zVq9L1K.0uO8e/7.m1B2x3D4E5F6G7H8I9J0K1L2M3', // admin123
      role: 'ADMIN',
      class_level: 'All Classes',
      stream: 'Management',
      profile_completed: true,
      can_edit_once: true,
    },
    {
      id: 2,
      student_id: 'SI20261042',
      name: 'Arjun Verma',
      email: 'arjun.verma@example.com',
      phone: '+91 98123 45678',
      password_hash: '$2a$10$wE9K.pS.bJ8zVq9L1K.0uO8e/7.m1B2x3D4E5F6G7H8I9J0K1L2M3', // password123
      role: 'STUDENT',
      class_level: 'Class 12',
      stream: 'Science (PCM / PCB)',
      parent_name: 'Rajesh Verma',
      profile_completed: true,
      can_edit_once: false,
    },
    {
      id: 3,
      student_id: 'SI2026FIRST',
      name: 'Sneha Mukherjee',
      email: 'sneha.mukherjee@example.com',
      phone: '+91 98234 56789',
      password_hash: '$2a$10$wE9K.pS.bJ8zVq9L1K.0uO8e/7.m1B2x3D4E5F6G7H8I9J0K1L2M3', // password123
      role: 'STUDENT',
      class_level: 'Class 11',
      stream: 'Commerce & CA Foundation',
      parent_name: 'Amit Mukherjee',
      profile_completed: false, // first login demo
      can_edit_once: true,
    },
  ],
  courses: [
    {
      id: 1,
      title: 'Class 10th (Bihar Board - BSEB) - All Subjects',
      class_level: 'Class 10',
      stream: 'General',
      duration: '1 Year (April - March)',
      fee_monthly: 300,
      fee_yearly: 3000,
      subjects: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Sanskrit'],
      description: 'Bihar Board 10th Class ke sabhi subjects (All Subjects) ki behtareen aur aasan taiyari. Har chapter ke simple notes, objective questions practice aur weekly test.',
    },
    {
      id: 2,
      title: 'Class 11th Science (Physics & Chemistry)',
      class_level: 'Class 11',
      stream: 'Science',
      duration: '1 Year (April - March)',
      fee_monthly: 400,
      fee_yearly: 4000,
      subjects: ['Physics', 'Chemistry'],
      description: '11th Science stream ke liye Physics aur Chemistry ki deep conceptual padhai. Numericals aur theory ko aasan examples ke saath samjhe.',
    },
    {
      id: 5,
      title: 'Class 12th Science (Physics & Chemistry)',
      class_level: 'Class 12',
      stream: 'Science',
      duration: '1 Year (April - March)',
      fee_monthly: 400,
      fee_yearly: 4000,
      subjects: ['Physics', 'Chemistry'],
      description: '12th Board exams me Physics aur Chemistry me 95%+ marks ke liye special strategy, VVI objectives practice aur handwritten notes.',
    },
  ],
  notes: [
    {
      id: 1,
      title: 'Relations and Functions – Complete NCERT Theory & Solved Examples',
      class_level: 'Class 12',
      subject: 'Mathematics',
      chapter: 'Chapter 1: Relations & Functions',
      file_size: '2.4 MB',
      file_url: '/sample-notes/maths-ch1.pdf',
      uploaded_by: 'Rakesh Sir',
    },
    {
      id: 2,
      title: 'Electrostatics & Gauss Law – Master Class Hand-Written Notes',
      class_level: 'Class 12',
      subject: 'Physics',
      chapter: 'Chapter 1: Electric Charges & Fields',
      file_size: '3.8 MB',
      file_url: '/sample-notes/physics-ch1.pdf',
      uploaded_by: 'Dr. Arvind Sharma',
    },
  ],
  tests: [
    {
      id: 1,
      title: 'Class 12 Mathematics – Relations & Functions Chapter Test',
      class_level: 'Class 12',
      subject: 'Mathematics',
      duration_minutes: 30,
      total_questions: 10,
      negative_marking: true,
      negative_mark_value: 0.25,
      questions: [
        {
          id: 1,
          question: 'Let R be a relation on the set N of natural numbers defined by nRm if n divides m. Then R is:',
          options: [
            'Reflexive and symmetric',
            'Transitive and symmetric',
            'Equivalence relation',
            'Reflexive, transitive but not symmetric',
          ],
          correctIndex: 3,
          explanation: 'Every natural number divides itself (Reflexive). If n|m and m|p, then n|p (Transitive). However, 2|4 but 4 does not divide 2 (Not symmetric).',
        },
      ],
    },
  ],
  receipts: [
    {
      id: 1,
      receipt_no: 'REC-2026-834912',
      payment_id: 'PAY_9K2L8X1M0Q',
      student_id: 'SI20261042',
      student_name: 'Arjun Verma',
      class_level: 'Class 12',
      course_name: 'Class 12 Science (PCM / PCB + Boards)',
      fee_type: 'Yearly',
      amount: 40000,
      payment_method: 'UPI',
      transaction_date: new Date().toISOString(),
      status: 'Paid',
    },
  ],
  notices: [
    {
      id: 1,
      title: 'Term 1 Mock Board Examination Schedule Announced',
      category: 'Examination',
      date_str: '28 Jul 2026',
      desc_text: 'The Term 1 full-syllabus mock test series for Class 10 and 12 will commence from 10th August 2026. Admit cards will be available in the student dashboard.',
    },
  ],
  announcements: [
    {
      id: 1,
      title: 'Admissions Open for Session 2026–27 – Up to 50% Scholarship',
      badge_tag: 'NEW BATCH',
      desc_text: 'Sarthak Institute is holding its National Scholarship Entrance Test (SINET) this Sunday. Meritorious students can avail tuition fee waivers.',
    },
  ],
  pending_registrations: [],
  profile_edit_requests: [],
};

module.exports = {
  generateStudentID,
  generateReceiptNumber,
  generatePaymentId,
  mockDatabaseStore,
};
