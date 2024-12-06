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

export const userController = {
  createStudent,
};
