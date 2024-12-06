import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.route('/student')
    .get(StudentControllers.getAllStudents)
    // .post(StudentControllers.createStudent)


router.route('/student/:studentId')
       .get(StudentControllers.getSingleStudent)


export const StudentRoute = router;