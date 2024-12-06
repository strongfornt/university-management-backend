import { z } from 'zod';

const userZodSchema = z.object({
  password: z
    .string({
        invalid_type_error: 'password must be string'
    })
    .max(20, { message: 'Password cannot be more then 20 characters' })
    .optional(),
});

export const userValidation = {
    userZodSchema,
}