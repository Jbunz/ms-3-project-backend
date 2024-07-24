// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  role: { type: String, enum: ['developer', 'recruiter'], required: true },
  profile: {
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    experience: { type: String, default: '' }
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
