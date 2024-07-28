require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const defineCurrentUser = require('./middleware/defineCurrentUser');
const path = require('path');
const app = express();
const connectDB = require('./database'); 

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'authToken']
  }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(defineCurrentUser);
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

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
