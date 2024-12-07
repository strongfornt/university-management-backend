import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .string({
          invalid_type_error: 'Academic faculty must be string'
      })
  }),
})
const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .string({
          invalid_type_error: 'Academic faculty must be string'
      })
  })
})

export const AcademicFacultyValidation = {
   createAcademicFacultyZodSchema,
   updateAcademicFacultyZodSchema,
}