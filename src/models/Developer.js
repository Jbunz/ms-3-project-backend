const mongoose = require('mongoose');
const User = require('./User');

const DeveloperSchema = new mongoose.Schema({
  profile: {
    description: { type: String, default: 'Your description goes here' },
    languages: { type: [String], default: [] },
    projects: { type: String, default: 'Enter your projects here' },
    profileImage: { type: String, default: 'frog-profile.jpg' }
  }
});

module.exports = User.discriminator('Developer', DeveloperSchema);