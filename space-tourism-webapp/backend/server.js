const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/missions', require('./routes/missionRoutes'));
app.use('/api/users',    require('./routes/userRoutes'));
app.use('/api/trips',    require('./routes/tripRoutes')); 
app.use('/api/guide',    require('./routes/guideRoutes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});