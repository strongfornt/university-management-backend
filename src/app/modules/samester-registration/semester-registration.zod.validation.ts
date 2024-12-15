import { z } from "zod";
import { semesterRegistrationStatus } from "./semester-registration.constants";


const createSemesterRegistrationValidationSchema = z.object({
    body:z.object({
        academicSemester: z.string(),
        status:z.enum([...semesterRegistrationStatus as [string, ...string[]]]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number()
    })
})

export const SemesterRegistrationValidation = {
    createSemesterRegistrationValidationSchema,
}