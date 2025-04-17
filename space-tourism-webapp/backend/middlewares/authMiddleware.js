// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function protect(req, res, next) {
  const header = req.headers.authorization;
  const token  = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid' });
  }
}

function isAdmin(req, res, next) {
  // normalize to lowercase so "Admin" or "admin" both work
  const role = req.user && req.user.role;
  if (role && role.toLowerCase() === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admins only' });
}

module.exports = { protect, isAdmin };
