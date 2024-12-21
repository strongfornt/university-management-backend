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
import { authMiddleware } from '../../middleware/auht';
import { USER_ROLE } from './user.constant';


const router = express.Router();

router
  .route('/create-student')
  .post(
    authMiddleware(USER_ROLE.admin),
    validationMiddleware(createStudentZodValidationSchema),
    userController.createStudent,
  );

  
router.post(
  '/create-faculty',
  authMiddleware(USER_ROLE.admin),
  validationMiddleware(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  // authMiddleware(USER_ROLE.admin),
  validationMiddleware(createAdminValidationSchema),
  userController.createAdmin,
);
export const UserRoute = router;
