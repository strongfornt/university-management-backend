import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { AuthValidation } from './auth.zod.validation';
import { AuthController } from './auth.controller';
// import { authMiddleware } from '../../middleware/auht';
import { USER_ROLE } from '../user/user.constant';
import authMiddleware from '../../middleware/auht';

const router = express.Router();

router
  .route('/login')
  .post(
    validationMiddleware(AuthValidation.loginValidationSchema),
    AuthController.loginUser,
  );

router
  .route('/change-password')
  .post(
    authMiddleware(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student) ,
    validationMiddleware(AuthValidation.changePasswordValidationSchema),
    AuthController.changePassword,
  );

router.post('/refresh-token',
  validationMiddleware(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
)  

export const AuthRoutes = router;
