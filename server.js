const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- MongoDB Connection ---
const uri = "mongodb+srv://lakshayn02:narula2004@cluster0.rog9v4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (uri) {
  mongoose.connect(uri);
  
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("✅ MongoDB database connection established successfully");
  });
  
  connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

// --- API Routes ---
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

// --- Health Check Route ---
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// --- IMPORTANT: EXPORT THE APP FOR VERCEL ---
module.exports = app;