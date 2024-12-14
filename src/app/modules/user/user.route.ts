import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { userController } from './user.controller';
import { validationMiddleware } from '../../middleware/validateRequest';
import { createStudentZodValidationSchema } from '../student/student.zod.validaton';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.zod.validation';


const router = express.Router();

router
  .route('/create-student')
  .post(
    validationMiddleware(createStudentZodValidationSchema),
    userController.createStudent,
  );

  
router.post(
  '/create-faculty',
  validationMiddleware(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validationMiddleware(createAdminValidationSchema),
  userController.createAdmin,
);
export const UserRoute = router;
