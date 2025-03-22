import { body, param, query } from 'express-validator';

// Validation for creating a product
export const createProductValidation = [
  body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  body('description').notEmpty().withMessage('Description is required').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),

  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required')
    .custom((value) => value.every((id: string) => /^[0-9a-fA-F]{24}$/.test(id)))
    .withMessage('Categories must be valid ObjectId references'),

  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),

  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),

  body('supplierInfo').optional().isString().withMessage('Supplier information must be a string'),

  // Optional fields validation
  body('dateAdded').optional().isISO8601().toDate().withMessage('Invalid date format'),
  body('lastUpdated').optional().isISO8601().toDate().withMessage('Invalid date format'),
];

// Validation for updating a product
export const updateProductValidation = [
  param('id').isMongoId().withMessage('Invalid product ID format'),

  body('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  body('description').optional().isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),

  body('categories')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one category is required')
    .custom((value) => value.every((id: string) => /^[0-9a-fA-F]{24}$/.test(id)))
    .withMessage('Categories must be valid ObjectId references'),

  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),

  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),

  body('supplierInfo').optional().isString().withMessage('Supplier information must be a string'),

  body('lastUpdated').optional().isISO8601().toDate().withMessage('Invalid date format'),
];

// Validation for deleting a product
export const deleteProductValidation = [param('id').isMongoId().withMessage('Invalid product ID format')];

// Validation for updating stock level
export const updateStockValidation = [param('id').isMongoId().withMessage('Invalid product ID format'), body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')];

// Validation for getting product by ID
export const getProductByIdValidation = [param('id').isMongoId().withMessage('Invalid product ID format')];

// Validation for low stock alerts
export const lowStockValidation = [];
