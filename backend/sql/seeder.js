const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedDatabase = async () => {
  console.log('🌱 [Seeder] Starting Sarthak Institute Database Seeder...');
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
    });

    console.log('✅ Connected to MySQL server.');

    const dbName = process.env.DB_NAME || 'sarthak_institute_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);

    console.log(`✅ Using Database: ${dbName}`);

    // Seed Admin user (Rakesh Sir)
    const adminPassHash = await bcrypt.hash('admin123', 10);
    await connection.query(
      `INSERT IGNORE INTO users (student_id, name, email, phone, password_hash, role, class_level, stream, profile_completed, can_edit_once)
       VALUES ('ADMIN_RAKESH', 'Rakesh Sharma', 'rakesh.sharma@sarthakinstitute.edu.in', '+91 98765 43210', ?, 'ADMIN', 'All Classes', 'Management', true, true)`,
      [adminPassHash]
    );

    // Seed Demo Student (Arjun Verma)
    const studentPassHash = await bcrypt.hash('password123', 10);
    await connection.query(
      `INSERT IGNORE INTO users (student_id, name, email, phone, password_hash, role, class_level, stream, parent_name, profile_completed, can_edit_once)
       VALUES ('SI20261042', 'Arjun Verma', 'arjun.verma@example.com', '+91 98123 45678', ?, 'STUDENT', 'Class 12', 'Science (PCM / PCB)', 'Rajesh Verma', true, false)`,
      [studentPassHash]
    );

    console.log('✅ Seeded demo Admin (`rakesh.sharma@sarthakinstitute.edu.in` / `admin123`) & Student (`arjun.verma@example.com` / `password123`).');
    console.log('🎉 Database seeding completed successfully.');
  } catch (err) {
    console.warn('⚠️ [Seeder] MySQL connection not available locally:', err.message);
    console.log('⚡ [Seeder] Using zero-config In-Memory Mock Store with pre-loaded demo users.');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
