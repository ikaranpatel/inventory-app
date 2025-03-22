import { body } from 'express-validator';

// Validation for registering a new user
export const registerUserValidation = [
  body('username').isString().withMessage('Username must be a string').notEmpty().withMessage('Username is required').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),

  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character')
    .trim(),

  body('role').optional().isIn(['admin', 'user']).withMessage('Role must be either "admin" or "user"').default('user'),
];

// Validation for logging in a user
export const loginUserValidation = [body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(), body('password').isString().withMessage('Password is required').trim()];
