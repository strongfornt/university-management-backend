import express from 'express';
import { AcademicSemesterController } from './academic-semester-controller';
import { validationMiddleware } from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academic-zod-validation';

const router = express.Router();

router
  .route('/create-academic-semester')
  .post(
    validationMiddleware(
      AcademicSemesterValidation.createAcademicValidationSchema,
    ),
    AcademicSemesterController.createAcademicSemester,
  );

router.get(
  '/academic-semesters',
  AcademicSemesterController.getAllAcademicSemesters,
);

router
  .route('/academic-semesters/:academicSemesterId')
  .get(AcademicSemesterController.getSingleAcademicSemester)
  .patch(
    validationMiddleware(
      AcademicSemesterValidation.updateAcademicValidationSchema,
    ),
    AcademicSemesterController.updateSingleAcademicSemester,
  );

export const AcademicSemesterRoute = router;
