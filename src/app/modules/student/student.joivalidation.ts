import Joi from 'joi';

// creating a schema validation using joi

const userNameJoiValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/) // Matches first letter capitalized and rest lowercase
    .required()
    .messages({
      'string.pattern.base': '"{#value}" is not capitalized',
      'string.max': 'First name cannot be more than 20 characters',
      'any.required': 'First name is required',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Za-z]+$/) // Ensures only alphabets
    .required()
    .messages({
      'string.pattern.base': '"{#value}" contains invalid characters',
      'string.max': 'Last name cannot be more than 20 characters',
      'any.required': 'Last name is required',
    }),
});

const guardianJoiValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardiansJoiValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'ID is required',
  }),
  name: userNameJoiValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '"{#value}" is not a valid gender',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '"{#value}" is not a valid email',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianJoiValidationSchema.required(),
  localGuardians: localGuardiansJoiValidationSchema.required(),
  profile: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .required()
    .messages({
      'any.only': '"{#value}" is not a valid status',
    }),
});

export default studentJoiValidationSchema;