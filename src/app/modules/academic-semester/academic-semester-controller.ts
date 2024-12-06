// import { UserService } from './user.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { AcademicSemesterService } from './academic-samester-service';

const createAcademicSemester = catchAsync( async (
  req,
  res,
  next
) => {
  
  // console.log(req.body);
  const {body} = req.body;
  
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester is Created successfully',
      data: result,
    });
});

const getAllAcademicSemesters = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semesters are retrieved successfully',
    data: result,
  });
})

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { academicSemesterId } = req.params;
  console.log(academicSemesterId);
  const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(academicSemesterId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  })
})

const updateSingleAcademicSemester = catchAsync(async (req, res,next) => {
  const { academicSemesterId } = req.params;
  const { body } = req.body;
  const result = await AcademicSemesterService.updateSingleAcademicSemesterFromDB(academicSemesterId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester is updated successfully',
    data: result,
  });


})


export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
 
};
