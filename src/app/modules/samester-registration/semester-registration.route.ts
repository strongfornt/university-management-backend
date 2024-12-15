import express from 'express'
import { validationMiddleware } from '../../middleware/validateRequest'
import { SemesterRegistrationValidation } from './semester-registration.zod.validation'
import { SemesterRegistrationController } from './semester-registration.controller'

const router = express.Router()

router.post('/create-semester-registration',
    validationMiddleware(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema),
    SemesterRegistrationController.createSemesterRegistration
)

// router.get('/', SemesterRegistrationController.getAllSemesterRegistration)

// router.route('/:id')
//         .get(SemesterRegistrationController.getSingleSemesterRegistration)
//         .patch(SemesterRegistrationController.updateSemesterRegistration)


export const semesterRegistrationRoute = router;        