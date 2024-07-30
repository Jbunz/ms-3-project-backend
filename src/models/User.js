const mongoose = require('mongoose');

const options = { discriminatorKey: 'role', timestamps: true };

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['developer', 'recruiter'] }
}, options);


module.exports = mongoose.model('User', UserSchema);
