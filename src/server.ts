import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import ENV from '@src/common/ENV';
import { NodeEnvs } from '@src/common/constants';
import connectDB from './util/database';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Connect to the database
connectDB();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Security
app.use(helmet());

// Routes
app.use('/api/v1', router);

// Add error handler
app.use(errorHandler); // Global error handler for all routes

export default app;
