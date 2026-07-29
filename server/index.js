const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blackvolt';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Application Schema
const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
  whatsapp: { type: String, required: true },
  whyJoin: { type: String, required: true },
  defenseTechExcites: { type: String, required: true },
  gainExpectation: { type: String, required: true },
  interests: { type: [String], required: true },
  experienceLevel: { type: Number, required: true },
  techExperience: { type: String, required: true },
  resumeLink: { type: String },
  foundingTeam: { type: String, required: true },
  hoursContribution: { type: String, required: true },
  comments: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', ApplicationSchema);

// API Endpoint to Submit Application
app.post('/api/apply', async (req, res) => {
  try {
    const applicationData = req.body;
    const newApplication = new Application(applicationData);
    await newApplication.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully', 
      data: {
        id: newApplication._id,
        regNo: newApplication.regNo
      }
    });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Failed to save application.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
