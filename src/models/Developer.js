const mongoose = require('mongoose');
const User = require('./User');

const DeveloperSchema = new mongoose.Schema({
  profile: {
    description: { type: String, default: 'Your description goes here' },
    languages: { type: [String], default: [] },
    projects: { type: String, default: 'Enter your projects here' },
    profileImage: { type: String, default: 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' }
  }
});

module.exports = User.discriminator('Developer', DeveloperSchema);
