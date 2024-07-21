const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./database'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
