import { startSession } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academicSamester-interface';
import { AcademicSemester } from '../academic-semester/academin-samester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, student: TStudent) => {
  //create a user object
  let userData: Partial<TUser> = {};

  // if password not given use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  //find admission semester info
  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );

  const session = await startSession();

  try {
    session.startTransaction();
    //set manually generated id
    userData.id = await generateStudentId(admissionSemester);
    //first create a user (transaction 1)
    const newUser = await UserModel.create([userData], { session });

    //throw a error if no newUSer
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    //create a student
    //set id, _id as user
    student.id = newUser[0].id;
    student.user = newUser[0]._id;

    //first create a user (transaction 2)
    const newStudent = await StudentModel.create([student], { session });

    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error('Failed to create user')

  }
};

export const UserService = {
  createStudentIntoDB,
  // Other user-related operations...
};
