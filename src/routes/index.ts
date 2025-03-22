import express from 'express';
import categoryRoutes from './categoryRoutes';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

// Base route for the API
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/user', userRoutes);

export default router;
