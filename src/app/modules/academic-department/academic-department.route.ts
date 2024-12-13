import express from 'express';
import { validationMiddleware } from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academic-department.zod.validation';
import { AcademicDepartmentController } from './academic-department.controller';


const router = express.Router();

router
  .route('/create-academic-department')
  .post(
    // validationMiddleware(
    //   AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
    // ),
    AcademicDepartmentController.createAcademicDepartment,
  );

router.get(
  '/',
  AcademicDepartmentController.getAllAcademicDepartment,
);

router
  .route('/:departmentId')
  .get(AcademicDepartmentController.getSingleAcademicDepartment)
  .patch(
    validationMiddleware(
      AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
    ),
    AcademicDepartmentController.updateSingleAcademicDepartment,
  );

export const AcademicDepartmentRoute = router;
