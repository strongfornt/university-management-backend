import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, months } from './academic-samester-contants';
import { TAcademicSemesterName } from './academicSamester-interface';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name:z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year:z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),

  })
});

const updateAcademicValidationSchema = z.object({
  body: z.object({
    name:z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year:z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),

  })
});

export const AcademicSemesterValidation = {
    createAcademicValidationSchema,
    updateAcademicValidationSchema,
}