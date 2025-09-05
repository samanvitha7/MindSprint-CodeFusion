require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Image upload and prediction endpoint
app.post('/api/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Create form data to send to FastAPI
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Send image to FastAPI ML backend
    const response = await axios.post('http://localhost:8000/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Return prediction result
    res.json({
      success: true,
      prediction: response.data
    });

  } catch (error) {
    console.error('Prediction error:', error.message);
    
    if (error.response) {
      // FastAPI returned an error
      res.status(error.response.status).json({
        success: false,
        error: error.response.data.detail || 'Prediction failed'
      });
    } else if (error.code === 'ECONNREFUSED') {
      // FastAPI server is not running
      res.status(503).json({
        success: false,
        error: 'ML service is unavailable. Please make sure the FastAPI server is running.'
      });
    } else {
      // Other errors
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
