import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academic-department.interface';


const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String  ,
      required: true,
      unique:true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'AcademicFaculty'
    }
  },

  {
    timestamps: true,
    versionKey:false
  },
);


export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
