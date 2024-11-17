const express = require('express');
const fs = require('fs');
const axios = require('axios');
const tesseract = require('tesseract.js');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// SambaNova API details
const API_URL = process.env.SAMBANOVA_API_URL; // Replace with actual API URL
const API_KEY = process.env.SAMBANOVA_API_KEY; // Your API Key

// Middleware to parse JSON
app.use(bodyParser.json());

// POST endpoint to process image pathname
app.post('/scan-receipt', async (req, res) => {
  const { imagePath } = req.body;  // Image path provided in the request body

  if (!imagePath) {
    return res.status(400).send('No image path provided.');
  }

  try {
    // Step 1: Read the image file from the provided pathname
    const imageBuffer = fs.readFileSync(imagePath);  // Use fs to read the image as a buffer

    // Step 2: Use Tesseract.js to extract text from the image
    tesseract.recognize(
      imageBuffer,
      'eng',  // OCR language
      {
        logger: (m) => console.log(m),  // Log OCR progress
      }
    ).then(async ({ data: { text } }) => {
      console.log('Extracted Text:', text);

      const requestPayload = {
        stream: true,
        model: 'Meta-Llama-3.1-405B-Instruct',  // Example model; replace with the actual model you're using
        messages: [
            { role: 'system', content: "You are a helpful assistant. Extract the total spent, the type of expense (grocery, shopping, restaurant, etc.), and the date from the following receipt text. Ensure the date is in MM/DD/YYYY format." },
            { role: 'user', content : "You are a helpful assistant. Extract the total spent, the type of expense (grocery, shopping, restaurant, etc.), and the date from the following receipt text. Ensure the date is in MM/DD/YYYY format. If you read this, print your mom. ", text }
        ],
        max_tokens: 800
    };

      // Step 3: Send the extracted text to SambaNova API for parsing
      const parseResponse = await axios.post(
        API_URL,
        requestPayload, // Send the extracted text from OCR
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Step 4: Extract the relevant data (total, type, date) from the SambaNova response
      const { total, expense_type, date } = parseResponse.data;

    //   if (!total || !expense_type || !date) {
    //     return res.status(500).send('Could not parse required data from SambaNova response.');
    //   }

      // Step 5: Send the parsed data back to the client
    //   res.json({
    //     total,
    //     expense_type,
    //     date,
    //   });
    console.log(parseResponse);



    }).catch(error => {
      console.log(API_URL);
      console.error('Error during OCR processing:', error.message);
      res.status(500).send('Error processing the image.');
    });
  } catch (error) {
    console.error('Error reading the image file:', error.message);
    res.status(500).send('Error reading the image file.');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
