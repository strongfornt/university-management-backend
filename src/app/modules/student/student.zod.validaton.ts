import { z } from 'zod';

// UserName Schema
const createUserNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .nonempty('First name is required')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be capitalized' },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20, 'Last name cannot be more than 20 characters')
    .nonempty('Last name is required')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters',
    }),
});

// Guardian Schema
const createGuardianSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

// Local Guardian Schema
const createLocalGuardianSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Occupation is required'),
  contactNo: z.string().nonempty('Contact number is required'),
  address: z.string().nonempty('Address is required'),
});

// Student Schema
const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      localGuardian: createLocalGuardianSchema,
      profileImg: z.string(),
      guardian: createGuardianSchema,
      admissionSemester: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

// Update Validation Schema
const updateStudentZodValidationSchema = z.object({
  body: z.object({
    // password: z.string().max(20).optional(),
    student: z
      .object({
        name: createUserNameSchema.partial(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        localGuardian: createLocalGuardianSchema.partial(),
        profileImg: z.string().optional(),
        guardian: createGuardianSchema.partial(),
        admissionSemester: z.string().optional(),
        isDeleted: z.boolean().optional(),
      })
      .partial(),
  }),
});

export { createStudentZodValidationSchema, updateStudentZodValidationSchema };
