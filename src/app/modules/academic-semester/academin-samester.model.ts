import { model, Schema } from 'mongoose';
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonth } from './academicSamester-interface';
import { AcademicSemesterCode, AcademicSemesterName, months } from './academic-samester-contants';


const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode
    },
    startMonth: {
      type: String,
      required:true,
      enum: months
    },
    endMonth: {
      type: String,
      required:true,
      enum: months
    },
  
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicSemesterSchema.pre('save',  async function(next) {
  const isSemesterExists =  await AcademicSemester.findOne({
    year: this.year,
    name: this.name
  })

  if(isSemesterExists) {
    throw new Error('Semester already exists');
  }
  next()
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
