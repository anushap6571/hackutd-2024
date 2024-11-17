require('dotenv').config();
const axios = require('axios');

const SAMBA_NOVA_API_URL = 'https://api.sambanova.ai/v1/chat/completions'; // Replace with the actual endpoint


//const API_KEY = process.env.SAMBA_NOVA_API_KEY; // Load API key from .env file
const API_KEY = process.env.MBA_NOVA_API_KEY;

// Function to send a POST request to the SambaNova API
async function processImage(imageData) {
    try {
        
        console.log('Sending data:', imageData);
        const response = await axios.post(SAMBA_NOVA_API_URL, imageData, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Response:', response.data);
        // Handle response data
        return response.data;
    } catch (error) {
        console.error('Error calling SambaNova API:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Export the function to use in other parts of your application
module.exports = { processImage };
