const mongoose = require('mongoose');
const User = require('./User');

const DeveloperSchema = new mongoose.Schema({
  profile: {
    description: { type: String, default: 'Your description goes here' },
    languages: { type: [String], default: [''] },
    projects: { type: String, default: 'Enter your projects here' },
  }
});

module.exports = User.discriminator('Developer', DeveloperSchema);
