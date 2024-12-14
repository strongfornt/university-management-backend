import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { CourseValidations } from './course.zod.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router
  .route('/create-course')
  .post(
    validationMiddleware(CourseValidations.createCourseValidationSchema),
    CourseController.createCourse,
  );

router.get('/', CourseController.getAllCourse);
router
  .route('/:id')
  .get(CourseController.getSingleCourse)
  .delete(CourseController.deleteCourse)
  .patch(
    validationMiddleware(CourseValidations.updateCourseValidationSchema),
    CourseController.updateCourse,
  );

router
  .route('/:courseId/assign-faculties')
  .put(
    validationMiddleware(
      CourseValidations.facultyWithCourseValidationSchema,
    ),
    CourseController.assignFacultiesWithCourse,
  );
router
  .route('/:courseId/remove-faculties')
  .delete(
    validationMiddleware(
      CourseValidations.facultyWithCourseValidationSchema,
    ),
    CourseController.removeFacultiesFromCourse,
  );

export const CourseRoute = router;
