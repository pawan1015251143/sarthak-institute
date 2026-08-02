const app = require('./app');
const dotenv = require('dotenv');
const { testConnection } = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log('================================================================');
  console.log('🏛️  SARTHAK INSTITUTE COACHING MANAGEMENT SYSTEM - BACKEND API');
  console.log('================================================================');

  // Test DB connection (auto-switches to in-memory fallback if MySQL is offline)
  await testConnection();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Server] Express Server Listening Alive on PORT: ${PORT}`);
    console.log(`🌐 [Server] API Health Check: http://localhost:${PORT}/api/health`);
    console.log('================================================================');
  });
};

startServer();

// Handle unhandled rejections cleanly
process.on('unhandledRejection', (err) => {
  console.error('🔥 [Unhandled Rejection]:', err.message || err);
});
