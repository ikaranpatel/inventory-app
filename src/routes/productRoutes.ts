import { validationResult } from 'express-validator';
import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, updateStockLevel, getLowStockAlerts } from '../controllers/productController';
import { authenticateUser } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/roleMiddleware';
import { createProductValidation, updateProductValidation, deleteProductValidation, updateStockValidation, getProductByIdValidation, lowStockValidation } from '../validators/productValidation';
import { handleValidationErrors } from '@src/util/validationMiddleware';

const router = express.Router();

// Create product route with validation
router.post('/', createProductValidation, handleValidationErrors, authenticateUser, authorizeRole('admin'), createProduct);

// Get all products route
router.get('/', authenticateUser, getProducts);

// Get product by ID route
router.get('/:id', getProductByIdValidation, handleValidationErrors, authenticateUser, getProductById);

// Update product route with validation
router.put('/:id', updateProductValidation, handleValidationErrors, authenticateUser, authorizeRole('Admin'), updateProduct);

// Delete product route
router.delete('/:id', deleteProductValidation, handleValidationErrors, authenticateUser, authorizeRole('Admin'), deleteProduct);

// Update stock level route
router.put('/:id/stock', updateStockValidation, handleValidationErrors, authenticateUser, updateStockLevel);

// Get low stock alerts route
router.get(
  '/low-stock',
  lowStockValidation, // No specific validation needed for this route
  handleValidationErrors,
  authenticateUser,
  getLowStockAlerts
);

export default router;
