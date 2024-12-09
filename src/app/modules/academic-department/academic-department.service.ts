import { TAcademicDepartment } from './academic-department.interface';
import { AcademicDepartmentModel } from './academic-department.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartmentModel.find({}).populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id).populate('academicFaculty');
  return result;
};

const updateSingleAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentFromDB,
};
