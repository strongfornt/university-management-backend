import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { AuthValidation } from './auth.zod.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router
  .route('/login')
  .post(
    validationMiddleware(AuthValidation.loginValidationSchema),
    AuthController.loginUser,
  );


export const AuthRoutes = router;  