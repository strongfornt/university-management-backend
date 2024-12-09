import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { userController } from './user.controller';
import { validationMiddleware } from '../../middleware/validateRequest';
import { createStudentZodValidationSchema } from '../student/student.zod.validaton';


const router = express.Router();

router
  .route('/create-student')
  .post(
    validationMiddleware(createStudentZodValidationSchema),
    userController.createStudent,
  );

export const UserRoute = router;
