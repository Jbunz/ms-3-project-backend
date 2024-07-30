require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const defineCurrentUser = require('./middleware/defineCurrentUser');
const app = express();
const connectDB = require('./database'); 

// Express Settings
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'authToken']
  }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(defineCurrentUser);

// Connect to MongoDB
connectDB();

// Controllers & Routes
app.use('/authentication', require('./controllers/authentication'));
app.use('/recruiter', require('./controllers/recruiterController'));
app.use('/developer', require('./controllers/developerController'));

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});