// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);  

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ error: `${field} already exists` });
    }

    res.status(500).json({ error: 'Server error' });
};
