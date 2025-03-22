import { body, param } from 'express-validator';
import { Types } from 'mongoose';

// Create Category Validation (already provided)
export const createCategoryValidation = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];

// Update Category Validation
export const updateCategoryValidation = [
  param('id')
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error('Invalid category ID');
      }
      return true;
    })
    .withMessage('Invalid category ID'),

  body('name').optional().isString().withMessage('Name must be a string').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  body('description').optional().isString().withMessage('Description must be a string').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];

// Get Category Validation (for category ID)
export const getCategoryValidation = [
  param('id')
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error('Invalid category ID');
      }
      return true;
    })
    .withMessage('Invalid category ID'),
];

// Delete Category Validation (for category ID)
export const deleteCategoryValidation = [
  param('id')
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error('Invalid category ID');
      }
      return true;
    })
    .withMessage('Invalid category ID'),
];
