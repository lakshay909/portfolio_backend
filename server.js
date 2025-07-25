const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// --- ADD THIS HERE ---
const corsOptions = {
  origin: 'https://portfolio-frontend-3ugh.onrender.com', // replace with your actual frontend deployed URL
  methods: ['GET', 'POST'],
  credentials: true
};
app.use(cors(corsOptions));
// --- Middleware ---
app.use(express.json());

// --- MongoDB Connection ---
const uri = "mongodb+srv://lakshayn02:deep8445@cluster0.rog9v4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (uri) {
  mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
  });

  
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
// module.exports = app;

// Instead, start server for Render:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


