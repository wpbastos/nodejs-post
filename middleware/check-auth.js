const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'VERY_LONG_SECRET_TO_JWT');
    next();
  } catch (error) {
    res.status(401).json({ message: 'auth failed!' });
  }
};
