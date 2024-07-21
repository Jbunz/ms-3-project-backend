const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user'); // Ensure this path is correct

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const runTests = async () => {
    try {
        await connectDB();

        // Create a new user
        const newUser = new User({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'developer',
            profile: {
                bio: 'A test user',
                skills: ['JavaScript'],
                experience: '1 year',
            },
        });
        await newUser.save();
        console.log('User created:', newUser);

        // Fetch all users
        const users = await User.find();
        console.log('Users found:', users);

        // Update a user
        const updatedUser = await User.findByIdAndUpdate(
            newUser._id,
            { name: 'Updated User' },
            { new: true }
        );
        console.log('User updated:', updatedUser);

        // Delete a user
        await User.findByIdAndDelete(newUser._id);
        console.log('User deleted');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        mongoose.connection.close();
    }
};

runTests();
