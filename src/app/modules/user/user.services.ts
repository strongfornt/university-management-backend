import mongoose, { startSession } from 'mongoose';
// import { TAcademicSemester } from '../academic-semester/academicSamester-interface';
import { AcademicSemester } from '../academic-semester/academin-samester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { TFaculty } from '../Faculty/faculty.interface';
import config from '../../config';
import { AcademicDepartmentModel } from '../academic-department/academic-department.model';
import { Faculty } from '../Faculty/faculty.model';
import { Admin } from '../Admin/admin.model';
import { TAdmin } from '../Admin/admin.interface';

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
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error)

  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserService = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB
  // Other user-related operations...
};
