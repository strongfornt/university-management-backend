import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import { USER_ROLE } from '../user/user.constant';
import authMiddleware from '../../middleware/auht';


const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validationMiddleware(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/',authMiddleware(USER_ROLE.admin, USER_ROLE.faculty) , FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
