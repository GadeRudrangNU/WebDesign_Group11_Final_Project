// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable CORS

// Setup API Routes (make sure you create these route files)
// For example, routes for authentication, missions, and users
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/missions', require('./routes/missionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
