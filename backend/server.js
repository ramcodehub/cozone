import dotenv from 'dotenv';
// Load environment variables immediately
dotenv.config();

import express from 'express';
import cors from 'cors';
// Contact routes removed as per requirements
import aiRoutes from './routes/aiRoutes.js';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow requests from Vite dev server
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
// Contact routes removed as per requirements
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});