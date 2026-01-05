const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log('AUTH HEADER:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('TOKEN:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT ERROR:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
