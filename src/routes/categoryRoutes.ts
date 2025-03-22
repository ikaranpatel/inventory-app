import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController';
import { authenticateUser } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/roleMiddleware';

import { handleValidationErrors } from '@src/util/validationMiddleware';
import { createCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from '@src/validators/categoryValidation';

const router = express.Router();

// Create a new category
router.post('/', createCategoryValidation, handleValidationErrors, authenticateUser, authorizeRole('admin'), createCategory);

// Get all categories
router.get('/', authenticateUser, authorizeRole('admin', 'user'), getCategories);

// Update category
router.put('/:id', updateCategoryValidation, handleValidationErrors, authenticateUser, authorizeRole('admin'), updateCategory);

// Delete category
router.delete('/:id', deleteCategoryValidation, handleValidationErrors, authenticateUser, authorizeRole('admin'), deleteCategory);

export default router;
