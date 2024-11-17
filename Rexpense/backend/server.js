
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { processImage } = require('./sambaService');
const app = express();

app.use(express.json({ limit: '20mb' }));


// Set up storage for multer (where the uploaded files will be stored)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Give it a unique filename
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


app.post('/upload-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const inputPath = req.file.path;
        const outputPath = path.join(__dirname, 'uploads', `compressed-${req.file.filename}.png`);
        let base64Image = "";  // Declare base64Image variable

        // Resize and compress the image before converting to base64
        const compressedBuffer = await sharp(inputPath)
            .resize(128, 128)  // Resize the image to 512x512 to reduce size
            .png({ quality: 80 })  // Compress the image with a quality of 80
            .toBuffer();  // Get the compressed image as a buffer
        
        // Optionally, delete the original file after compression
        fs.unlinkSync(inputPath);

        // Convert the buffer to base64
        base64Image = compressedBuffer.toString('base64');

        // Prepare the request body for the SambaNova API
        // const imageData = {
        //     "messages": [
        //         {
        //             "role": "user",
        //             "content": base64Image,  // The resized and compressed image
        //         }
        //     ],
        //     "model": "Llama-3.2-11B-Vision-Instruct" // Use a model with a reasonable token limit
        // };
        const imageData = {
            "model": "Llama-3.2-11B-Vision-Instruct",
            "messages": [
              {
                "role": "user",
                "content": [
                  {
                    "type": "text",
                    "text": "What'\''s in this image?"
                  },
                  {
                    "type": "image",  // Using "image" type instead of "image_url"
                    "image": {
                        "data": `data:image/jpeg;base64,${base64Image}`  // Directly include the base64 image
                    }
                },
                //   {
                //     "type": "image_url",
                //     "image_url": {
                //       "url": "data:image/jpeg;base64,{base64Image}"
                //     }
                //   },

                  {
                    "type": "text",
                    "text": "Summarize"
                  },
                ]
              }
            ],
            "max_tokens": 800, 
            "temperature": 0, 
            "top_p": 0, 
            "top_k": 1, 
            "stop": "<eot>",
          }
        

        // Call the processImage function and return the result
        const result = await processImage(imageData);

        // Return the result to the client
        return res.json(result);  // Use return to prevent further execution

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Error compressing image' });  // Return error response if any issue
    }
});
    // try {
    //     const inputPath = req.file.path;
    //     const outputPath = path.join(__dirname, 'uploads', `compressed-${req.file.filename}.png`);
    //     let base64Image = ""; // Declare base64Image variable

    //     // Use async/await for sharp to compress the image
    //     const compressedBuffer = await sharp(inputPath)
    //         .png({ quality: 80 })  // Compress with quality of 80
    //         .toBuffer();  // Get the compressed image as a buffer
        
    //     // Optionally, delete the original file after compression
    //     fs.unlinkSync(inputPath);

    //     // Convert the buffer to base64
    //     base64Image = compressedBuffer.toString('base64');

    //     // Prepare the request body for the SambaNova API
    //     const imageData = {
    //         "messages": [
    //             {
    //                 "role": "user",
    //                 "content": base64Image,
    //             }
    //         ],
    //         "model": "Llama-3.2-11B-Vision-Instruct"
    //     };

    //     // Call the processImage function and return the result
    //     const result = await processImage(imageData);

    //     // Send the result back to the client only once
    //     return res.json(result);  // Return ensures no further code executes

    // } catch (err) {
    //     console.error('Error:', err);
    //     return res.status(500).json({ error: 'Error compressing image' });  // Return on error
    // }
// });






// app.post('/upload-image', upload.single('image'), async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//     try{
//         const inputPath = req.file.path;
//         const outputPath = path.join(__dirname, 'uploads', `compressed-${req.file.filename}.png`);
//         const base64Image = "";
    
//         sharp(inputPath)
//         .png({ quality: 80 })  // Compress with quality of 80
//         .toBuffer()  // Get the compressed image as a buffer
//         .then((compressedBuffer) => {
//             // Optionally, delete the original file after compression
//             fs.unlinkSync(inputPath);
    
//             // Convert the buffer to base64
//             base64Image = compressedBuffer.toString('base64');
    
//             // res.json({
//             //   message: 'File uploaded and compressed successfully!',
//             //   image: `data:image/png;base64,${base64Image}`,  // Send the base64 encoded image
//             // });
//             const imageData = {
//                 "messages": [
//                     {
//                         "role": "user",
//                         "content": base64Image,
//                     }
//                 ],
//                 "model": "Llama-3.2-11B-Vision-Instruct"
//               }

//             const result = await processImage(imageData);
//             res.json(result);  // Return the result to the client
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Error compressing image' });
        
//       });

      
    

    //   try {
    //     // Process the image using the SambaNova API
    //     const result = await processImage(imageData);
    //     res.json(result);  // Return the result to the client
    // } catch (error) {
    //     res.status(500).json({ error: 'Error processing image' });
    // 
    


// Start the Express server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

///

// // Sample route to process image data
// app.post('/process-image', async (req, res) => {
//     //console.log(req.body.text);
//    const imageData = req.body.text;

   

//     try {
//         // Process the image using the SambaNova API
//         const result = await processImage(imageData);
//         res.json(result);  // Return the result to the client
//     } catch (error) {
//         res.status(500).json({ error: 'Error processing image' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

