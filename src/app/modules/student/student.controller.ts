import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';



const getAllStudents = catchAsync(async (req, res, next) => {

  const result = await StudentServices.getAllStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {body}= req.body;
  const {student} = body;
  // console.log(student);
  const result = await StudentServices.updateStudentIntoDB(id, student);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
