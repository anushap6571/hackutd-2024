// Import required modules
const express = require('express');
const app = express();

require('dotenv').config();


// Define a port
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON (if needed)
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to your Node.js app!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
