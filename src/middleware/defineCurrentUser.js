const jwt = require('jsonwebtoken');
const User = require('../models/User');

const defineCurrentUser = async (req, res, next) => {
  const token = req.header('authToken');
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);
    req.user = await User.findById(decoded.user.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    next();
  }
  
};

module.exports = defineCurrentUser;
