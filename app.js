const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection - Optimized for serverless
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-atlas-connection-string';

// Create a cached connection variable
let cachedDb = null;

// Function to connect to MongoDB
async function connectToDatabase() {
  // If the database connection is cached, use it
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  try {
    // Connect to MongoDB
    const client = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log('MongoDB connected successfully');
    
    // Cache the database connection
    cachedDb = client;
    return cachedDb;
  } catch (err) {
    console.log('MongoDB connection error:', err);
    // Fallback to in-memory data if MongoDB connection fails
    console.log('Using in-memory data storage as fallback');
    return null;
  }
}

// Connect to MongoDB at startup for non-serverless environments
if (process.env.NODE_ENV !== 'production') {
  connectToDatabase()
    .then(() => console.log('MongoDB connected for development'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Add connection middleware for serverless environments
app.use(async (req, res, next) => {
  // For production/serverless, connect on each request if needed
  if (process.env.NODE_ENV === 'production' && !cachedDb) {
    try {
      await connectToDatabase();
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Continue even if connection fails - will use fallback data
    }
  }
  next();
});

// Add a simple health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Import routes
const indexRoutes = require('./routes/index');
const expenseRoutes = require('./routes/expenses');

// Use routes
app.use('/', indexRoutes);
app.use('/expenses', expenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 