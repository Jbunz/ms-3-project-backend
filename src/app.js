const express = require('express');
require('dotenv').config();
const connectDB = require('./database');
const userRoutes = require('./routes/userRoutes');
const developerRoutes = require('./routes/developerRoutes'); 
const recruiterRoutes = require('./routes/recruiterRoutes'); 
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/developers', developerRoutes); 
app.use('/api/recruiters', recruiterRoutes); 

// Use error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
