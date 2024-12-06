import { StudentModel } from './student.model';
// import { Student } from './student.interface';

const getAllStudentFromDB = async () =>{
        const result = await StudentModel.find();
        return result;
}

const getSingleStudentFromDB = async (id:string) =>{
   const result = await StudentModel.findOne({id:id})
   return result;
}
const deleteStudentFromDB = async (id:string) => {
  const result = await StudentModel.findByIdAndDelete(id);
  return result;
}

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
