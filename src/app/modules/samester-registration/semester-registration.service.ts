import { StatusCodes } from "http-status-codes"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academic-semester/academin-samester.model"
import { TSemesterRegistration } from "./samester-registration.interface"
import { SemesterRegistrationModel } from "./semester-registration.model"

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

      //check if the semester exist
      const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
      if(!isAcademicSemesterExist) {
          throw new AppError(StatusCodes.NOT_FOUND,'This Academic semester not found!')
      }

      //check if the semester is already registered
    const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
        academicSemester
    })
    
    if(isSemesterRegistrationExists){
        throw new AppError(StatusCodes.CONFLICT,'Semester registration already exists!')
    }


    const result = await SemesterRegistrationModel.create(payload)
    return result

  

}
const getAllSemesterRegistrationFromDB = async () => {}
const getSingleSemesterRegistrationFromDB = async () => {}
const updateSemesterRegistrationIntoDB = async () => {}

export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}