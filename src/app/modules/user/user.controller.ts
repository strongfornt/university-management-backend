import { UserService } from './user.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';

const createStudent = catchAsync( async (
  req,
  res,
  next
) => {
    const {body}= req.body;
    const {password, student} = body;
  
    const result = await UserService.createStudentIntoDB(password, student);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student is Created successfully',
      data: result,
    });
});
const createFaculty = catchAsync(async (req, res) => {
  const {body}= req.body;
  const { password, faculty: facultyData } = body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const {body}= req.body;
  const { password, admin: adminData } = body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});



export const userController = {
  createStudent,
  createAdmin,
  createFaculty
};
