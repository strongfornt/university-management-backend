
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { SemesterRegistrationService } from './semester-registration.service';

const createSemesterRegistration = catchAsync( async (
  req,
  res,
  next
) => {
    const {body}= req.body;
    

    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(body)
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'SemesterRegistration is Created successfully',
      data: result,
    });
});

const getAllSemesterRegistration = catchAsync(async (req, res, next) => {

  const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester registration are retrieved successfully',
    data: result,
  });
});


const getSingleSemesterRegistration = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'SemesterRegistration is retrieved successfully',
    data: result,
  })
})
const updateSemesterRegistration = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const {body} = req.body;
  const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id,body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'SemesterRegistration is retrieved successfully',
    data: result,
  })
})




export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
    // createFaculty,
    // createAdmin
}