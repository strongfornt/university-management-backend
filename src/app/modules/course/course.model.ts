import { Schema } from 'mongoose';
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from './course.interface';
import { model } from 'mongoose';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref:'Course'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const CourseModel = model<TCourse>('Course', courseSchema);


const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref:'Course',
    unique:true
  },
  faculties:[ {
    type: Schema.Types.ObjectId,
    ref:'Faculty'
  },]
});

export const CourseFacultyModel = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);