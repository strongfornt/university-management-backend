// import { UserService } from './user.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { AcademicFacultyService } from './academic-faculty.services';

const createAcademicFaculty = catchAsync( async (
  req,
  res,
  next
) => {
  
  // console.log(req.body);
  const {body} = req.body;
  
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic faculty is Created successfully',
      data: result,
    });
});

const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty are retrieved successfully',
    data: result,
  });
})

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  console.log(facultyId);
  const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  })
})

const updateSingleAcademicFaculty = catchAsync(async (req, res,next) => {
  const { facultyId } = req.params;
  const { body } = req.body;
  const result = await AcademicFacultyService.updateSingleAcademicFacultyFromDB(facultyId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty  is updated successfully',
    data: result,
  });


})


export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
 
};
