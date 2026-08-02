const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let pool = null;
let useMockDb = false;

// Attempt MySQL connection pool initialization
try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'sarthak_institute_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
} catch (error) {
  console.warn('⚠️ [DB] MySQL pool creation failed, switching to in-memory fallback mode.');
  useMockDb = true;
}

// Test database connection
const testConnection = async () => {
  try {
    if (useMockDb || !pool) {
      console.log('⚡ [DB] Running in In-Memory Mock mode (No active MySQL detected).');
      return false;
    }
    const connection = await pool.getConnection();
    console.log('✅ [DB] MySQL Database Connected Successfully to `sarthak_institute_db`');
    connection.release();
    return true;
  } catch (err) {
    console.warn(`⚠️ [DB] MySQL connection attempt failed: ${err.message}`);
    console.warn('⚡ [DB] Automatic fallback enabled: API will serve memory-backed data.');
    useMockDb = true;
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  getIsMock: () => useMockDb,
};
