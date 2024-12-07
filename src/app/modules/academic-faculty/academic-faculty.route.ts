import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academic-faculty-zod.validation';
import { AcademicFacultyController } from './academic-faculty-controller';

const router = express.Router();

router
  .route('/create-academic-faculty')
  .post(
    validationMiddleware(
      AcademicFacultyValidation.createAcademicFacultyZodSchema,
    ),
    AcademicFacultyController.createAcademicFaculty,
  );

router.get(
  '/',
  AcademicFacultyController.getAllAcademicFaculties,
);

router
  .route('/:facultyId')
  .get(AcademicFacultyController.getSingleAcademicFaculty)
  .patch(
    validationMiddleware(
      AcademicFacultyValidation.updateAcademicFacultyZodSchema,
    ),
    AcademicFacultyController.updateSingleAcademicFaculty,
  );

export const AcademicFacultyRoute = router;
