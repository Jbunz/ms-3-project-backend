const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    role: { type: String, enum: ['developer', 'recruiter'], required: true },
    profile: {
        description: { type: String, default: '' }, // Changed from bio to description
        languages: { type: [String], default: [] }, // Changed from skills to languages
        projects: { type: [String], default: [] } // Changed from experience to projects
    },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // Reference to recruiter for developers
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
