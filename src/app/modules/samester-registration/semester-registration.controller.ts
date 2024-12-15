
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
// const createFaculty = catchAsync(async (req, res) => {1
//   const {body}= req.body;
//   const { password, faculty: facultyData } = body;

//   const result = await SemesterRegistrationController.createFacultyIntoDB(password, facultyData);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Faculty is created successfully',
//     data: result,
//   });
// });

// const createAdmin = catchAsync(async (req, res) => {
//   const {body}= req.body;
//   const { password, admin: adminData } = body;

//   const result = await UserService.createAdminIntoDB(password, adminData);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Admin is created successfully',
//     data: result,
//   });
// });



export const SemesterRegistrationController = {
    createSemesterRegistration
}