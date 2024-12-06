import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academicSamester-interface';
import { AcademicSemester } from '../academic-semester/academin-samester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

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

  //set manually generated id
  userData.id = await generateStudentId(admissionSemester);
  //first create a user
  const newUser = await UserModel.create(userData);

  // Ensure newUser is defined and valid
  if (!newUser || !newUser.id) {
    throw new Error('Failed to create user or user ID is missing.');
  }
  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    student.id = newUser.id;
    student.user = newUser._id;

    const newStudent = await StudentModel.create(student);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
  // Other user-related operations...
};
