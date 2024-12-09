import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academic-department.interface';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'AcademicFaculty',
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);



academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(404,'Department already exists');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(404,'Department does not exist');
  }

  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
