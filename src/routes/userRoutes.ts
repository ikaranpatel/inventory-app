import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { loginUserValidation, registerUserValidation } from '@src/validators/userValidation';
import { handleValidationErrors } from '@src/util/validationMiddleware';

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUserValidation, handleValidationErrors, registerUser);

// Route for logging in a user
router.post('/login', loginUserValidation, handleValidationErrors, loginUser);

export default router;
