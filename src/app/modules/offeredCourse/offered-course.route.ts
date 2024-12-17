import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offered-course-zod.validation';
import { OfferedCourseControllers } from './offered-course.controller';

const router = express.Router();

// router.get('/', OfferedCourseControllers.getAllOfferedCourses);

// router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validationMiddleware(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validationMiddleware(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

// router.delete(
//   '/:id',
//   OfferedCourseControllers.deleteOfferedCourseFromDB,
// );

export const offeredCourseRoutes = router;
