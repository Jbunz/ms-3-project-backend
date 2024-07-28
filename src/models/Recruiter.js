const mongoose = require('mongoose');
const User = require('./User');

const RecruiterSchema = new mongoose.Schema({
  profile: {
    company: { type: String, required: true }
  }
});

module.exports = User.discriminator('Recruiter', RecruiterSchema);
