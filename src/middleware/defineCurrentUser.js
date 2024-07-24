// middleware/defineCurrentUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const defineCurrentUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};

module.exports = defineCurrentUser;
