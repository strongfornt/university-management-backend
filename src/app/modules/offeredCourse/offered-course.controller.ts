import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offered-course.service';

const createOfferedCourse = catchAsync(async (req, res, next) => {
  const { body } = req.body;
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course is created successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course is updated successfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res, next) => {
      const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(req.query)
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        data: result,
      });
  });

  const getSingleOfferedCourses = catchAsync(
    async (req, res,next) => {
      const { id } = req.params;
        const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id)
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: 'OfferedCourse fetched successfully',
          data: result,
        });
    },
  );

  const deleteOfferedCourseFromDB = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OfferedCourse deleted successfully',
        data: result,
      });
    },
  );
  
export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  deleteOfferedCourseFromDB,
};
