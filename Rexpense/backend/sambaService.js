require('dotenv').config();
const axios = require('axios');

const SAMBA_NOVA_API_URL = 'https://api.sambanova.ai/v1/chat/completions'; // Replace with the actual endpoint


//const API_KEY = process.env.SAMBA_NOVA_API_KEY; // Load API key from .env file
const API_KEY = 'fe3ff526-dc7d-4e18-b27d-29d12e42c810';
//console.log(process.env);  // This will show all environment variables loaded
//console.log(process.env.SAMBA_NOVA_API_KEY);
// Function to send a POST request to the SambaNova API
async function processImage(imageData) {
    try {
        // If the image data is base64, you might want to wrap it in a message format
        // const message = {
        //     role: 'user', // 'user' or 'system' depending on your use case
        //     content: {
        //         image: imageData,  // The base64-encoded image
        //         prompt: "What is the weather?"    // The text prompt you want to send along with the image
        //     }  // The base64 image data or some content
        // };

        // // Construct the request body
        // const requestBody = {
        //     messages: [message],  // The API expects an array of messages
        //     model: 'Llama-3.2-11B-Vision-Instruct' // Replace with your actual model ID
        // };

        //console.log('Sending data:', requestBody);
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
