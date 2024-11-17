require('dotenv').config();
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const tesseract = require('tesseract.js');
const bodyParser = require('body-parser');


const app = express();


// SambaNova API details
const API_URL = "https://api.sambanova.ai/v1/chat/completions";
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
       model: 'Meta-Llama-3.1-8B-Instruct',  // Example model; replace with the actual model you're using
       messages: [
         { role: 'system', content: "You are a helpful assistant. Extract the total, the type of expense (grocery, shopping, restaurant, etc.), and the date from the following receipt text. Ensure the date is in MM-DD-YYYY format. Make the total cost have no dollar sign" },
         { role: 'user', content: text}
       ],
       max_tokens: 800
     };


     // Step 3: Send the extracted text to SambaNova API for parsing
     const response = await axios.post(API_URL, requestPayload, {
       headers: {
         'Authorization': `Bearer ${API_KEY}`,
         'Content-Type': 'application/json',
       },
       responseType: 'stream', // This ensures we handle the response as a stream
     });


     let fullResponse = '';  // To accumulate the response content


     // Step 4: Handle the streamed response
     response.data.on('data', (chunk) => {
       let chunkString = chunk.toString();
       let jsonData = chunkString.replace(/^data: /, ''); // Remove "data: " prefix
      
       // If the chunk is [DONE], stop processing
       if (jsonData.trim() === '[DONE]') {
         console.log('Streaming is complete.');
         return;
       }


       // Parse the JSON chunk
       try {
         const parsedData = JSON.parse(jsonData);
         const assistantMessage = parsedData.choices[0].delta.content;


         // Append the assistant's message to the full response
         fullResponse += assistantMessage;


         // Log the current chunk message
         console.log('Assistant Message Chunk:', assistantMessage);
       } catch (err) {
         console.error('Error parsing chunk:', err);
       }
     });


     // Listen for the end of the stream
     response.data.on('end', () => {
       console.log('Final Response:', fullResponse);


       // Step 5: Process the full response and extract data
       const parsedResponse = processFullResponse(fullResponse);


       // Format the date and return the response in the desired format
       const formattedResponse = formatResponse(parsedResponse);


       // Send the parsed data back to the client
       res.json(formattedResponse);
     });


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


// Helper function to process the full response text
function processFullResponse(fullResponse) {
 // Example processing logic for the full response
 // This depends on the structure of the full response from the model.
 console.log('Processing final full response...');
 console.log(fullResponse);


 // Dummy extraction - replace with actual parsing logic based on your response format
 //const total = fullResponse.match(/total\s(\d+\.\d{2})/);  // Example regex to extract total
 const total = fullResponse.match(/(?:total|amount|cost)\s*[:\-]?\s*\$?(\d+\.\d{2})/i);  // Match total amount
 const expense_type = fullResponse.match(/(grocery|shopping|restaurant|etc.)/i); // Example expense type match
 const date = fullResponse.match(/\d{2}-\d{2}-\d{4}/); // Example regex to extract date


 return {
   total: total ? total[1] : null,
   expense_type: expense_type ? expense_type[0] : null,
   date: date ? date[0] : null,
 };
}


function formatResponse(parsedResponse) {
 if (!parsedResponse.date) {
   return {};  // Return an empty object if no date is found
 }


 // Convert the date from MM/DD/YYYY to DD-MM-YYYY
 const [month, day, year] = parsedResponse.date.split('-');
 const formattedDate = `${day}-${month}-${year}`;


 return {
   [formattedDate]: {
     total: parsedResponse.total,
     date: parsedResponse.date,
     type: parsedResponse.expense_type,
   },
 };
}


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
