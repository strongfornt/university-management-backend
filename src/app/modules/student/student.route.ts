import express from 'express';
import { StudentControllers } from './student.controller';
import { validationMiddleware } from '../../middleware/validateRequest';
import { updateStudentZodValidationSchema } from './student.zod.validaton';

const router = express.Router();

router.route('/')
    .get(StudentControllers.getAllStudents)
    // .post(StudentControllers.createStudent)


router.route('/:studentId')
       .get(StudentControllers.getSingleStudent)
       .delete(StudentControllers.deleteStudent)
       .patch(
        validationMiddleware(updateStudentZodValidationSchema)
        ,StudentControllers.updateStudent)


export const StudentRoute = router;