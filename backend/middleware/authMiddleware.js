const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key'; 
    const decoded = jwt.verify(token.split(' ')[1], secretKey); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid token.' });
  }
};