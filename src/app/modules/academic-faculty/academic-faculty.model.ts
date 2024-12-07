import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academic-faculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String  ,
      required: true,
      unique:true
    },
  },
  {
    timestamps: true,
    versionKey:false
  },
);


export const AcademicFacultyModel = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);
