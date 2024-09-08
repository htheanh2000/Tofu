const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

export const maxDuration = 15
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());
// Set up multer for file uploads without storing the file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fake file upload API
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        // const { fileName } = req.body;
    const file = req.file;
    // Ensure the file name is provided
    if (!file) {
        return res.status(400).json({
            message: 'File is required'
        });
    }

    const fileName = file.originalname;

    console.log(`File upload initiated for ${file.originalname}...`);

    // Generate a random time between 10 and 15 seconds
    const uploadTime = Math.floor(Math.random() * 5000) + 10000;
    // Simulate the upload process
    setTimeout(() => {
        // Generate a random number to decide if the upload succeeds or fails
        const isSuccess = Math.random() < 0.7; // 90% chance of success

        if (isSuccess) {
            console.log(`File upload successful for ${fileName} after ${uploadTime} ms`);
            res.status(200).json({
                message: 'File upload successful',
                fileName: fileName,
                uploadTime: `${uploadTime} ms`
            });
        } else {
            console.log(`File upload failed for ${fileName} after ${uploadTime} ms`);
            res.status(500).json({
                message: 'File upload failed',
                fileName: fileName,
                uploadTime: `${uploadTime} ms`
            });
        }
    }, uploadTime);
    } catch (error) {
        
    }
    
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});