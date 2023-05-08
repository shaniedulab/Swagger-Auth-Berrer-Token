const jwt = require('jsonwebtoken');

// This function generates a JWT token for a given user ID
function generateToken(userId) {
  const payload = { userId };
  const secret = 'my-secret'; // Replace with your own secret key
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
}

// This middleware function verifies that the request has a valid JWT token
function verifyToken(req, res, next) {
  console.log("req.header",req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }
  const token = authHeader.substring('Bearer '.length);
  const secret = 'my-secret'; // Replace with your own secret key
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
}

module.exports = { generateToken, verifyToken };
