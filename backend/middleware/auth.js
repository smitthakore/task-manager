import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error); // Log the error
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

export default authenticateToken;
