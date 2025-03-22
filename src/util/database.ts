import { throwError } from '@src/middleware/errorHandler';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost/inventory-management');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throwError('Database connection failed', 500);
  }
};

export default connectDB;
