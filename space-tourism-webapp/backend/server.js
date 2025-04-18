// backend/server.js
const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// existing routes
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/missions', require('./routes/missionRoutes'));

app.use('/api/users',    require('./routes/userRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));

// new trip & booking routes
// if you wrote tripRoutes.js with ES modules, either convert to commonjs:
//    const tripRoutes = require('./routes/tripRoutes');
// or rename to .cjs and import accordingly.

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/guide', require('./routes/guideRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);