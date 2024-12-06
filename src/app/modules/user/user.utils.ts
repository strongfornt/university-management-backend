import { TAcademicSemester } from '../academic-semester/academicSamester-interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return  lastStudent?.id ? lastStudent.id.toString().substring(6) : undefined;
};

//year semesterCode 4 digits number
export const generateStudentId = async (payload: TAcademicSemester ): Promise<string> => {
   // console.log(await findLastStudentId())
   
  const currentId = await findLastStudentId() ||  (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

// export const generateStudentId = async (
//    academicSemester: TAcademicSemester | null,
//  ): Promise<string> => {
//    const currentId =
//      (await findLastStudentId()) || (0).toString().padStart(4, '0') //00000
//    //increment by 1
 
//    if (!academicSemester) {
//      throw new Error('Academic semester is null')
//    }
 
//    let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0')
//    //20 25
//    incrementedId = `${academicSemester.year.substring(2)}${
//      academicSemester.code
//    }${incrementedId}`
 
//    return incrementedId
//  }
