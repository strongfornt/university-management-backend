import mongoose from 'mongoose';
import { TSemesterRegistration } from './samester-registration.interface';
import { semesterRegistrationStatus } from './semester-registration.constants';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: semesterRegistrationStatus,
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3,
    },
    maxCredit: {
        type: Number,
        default: 15,
    }
  },{
    timestamps:true
  }
);

export const SemesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
