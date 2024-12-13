import { startSession } from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/Query.builder';
import { studentSearchableFields } from './student.constants';
// import { Student } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = {...query};

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // //Filtering
  // const excludeFields = ['searchTerm','sort','limit','page','fields'];

  // excludeFields.forEach((el) => delete queryObj[el])

  // console.log(query, queryObj);

  // const filterQuery =  searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  //   let sort = '-createdAt';

  //   if(query.sort) {
  //     sort = query?.sort as string;
  //   }

  //   const sortQuery = filterQuery.sort(sort)

  //   let page = 1;
  //   let limit = 1;
  //   let skip = 0;

  //   if(query.limit) {
  //     limit = Number(query?.limit) as number;
  //   }

  //   if(query.page) {
  //     page = Number(query?.page) as number;
  //     skip = (page - 1) * limit;
  //   }

  //   const paginationQuery = sortQuery.skip(skip)

  //   const limitQuery =  paginationQuery.limit(limit)

  //   //field limiting
  //   let fields = '';

  //   if(query.fields) {
  //     fields = (query?.fields as string).split(',').join(' ');
  //     console.log(fields);

  //   }

  //   const fieldQuery = await limitQuery.select(fields)
  // return fieldQuery;

  const studentQuery = new QueryBuilder(StudentModel.find() .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  , query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await studentQuery.modelQuery;
    return result
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedStudent: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedStudent[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedStudent[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedStudent[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedStudent);

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedStudent,
    { new: true, runValidators: true },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(400, 'Failed to deleted student');
    }

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(400, 'Failed to deleted user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
