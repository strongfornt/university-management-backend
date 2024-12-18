import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../samester-registration/semester-registration.model';
import { OfferedCourseModel } from './offere-course.model';
import { TOfferedCourse } from './offered-course.interface';
import { AcademicFacultyModel } from '../academic-faculty/academic-faculty.model';
import { AcademicDepartmentModel } from '../academic-department/academic-department.model';
import { CourseModel } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { hasTimeConflict } from './offered-course.utils';
import QueryBuilder from '../../builder/Query.builder';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  //check if semester registration is exists!
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester registration is not found!',
    );
  }

  const academicSemester = isSemesterRegistrationExists?.academicSemester;

  //check if academic faculty  is exists!
  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Faculty is not found!');
  }

  //check if academic department  is exists!
  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Academic Department is not found!',
    );
  }
  //check if academic department  is exists!
  const isCourseExists = await CourseModel.findById(course);

  if (!isCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Course is not found!');
  }
  //check if academic department  is exists!
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty  not found!');
  }

  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This ${isAcademicDepartmentExists?.name} is not belong to this ${isAcademicFacultyExists?.name} `,
    );
  }

  const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Offered course already exists with same registered semester and section!',
    );
  }

  //get the schedules of faculties
  const assignedSchedule = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This Faculty is not available at that time! choose other time or day',
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExits = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered Course not found!');
  }

  const isFacultyExits = await OfferedCourseModel.findById(id);

  if (!isFacultyExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered Course not found!');
  }

  const semesterRegistration = isOfferedCourseExits?.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You cannot update this offered course as it is ${semesterRegistrationStatus?.status} `,
    );
  }

  //get the schedules of faculties
  const assignedSchedule = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This Faculty is not available at that time! choose other time or day',
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourseModel.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
     StatusCodes.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndDelete(id);

  return result;
};



export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
};
