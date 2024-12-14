import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import { CourseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";


const createCourse = catchAsync( async (
  req,
  res,
  next
) => {
  
  // console.log(req.body);
  const {body} = req.body;
  
    const result = await CourseServices.createCourseIntoDB(body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Course  is Created successfully',
      data: result,
    });
});

const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
})

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res,next) => {
  const { id } = req.params;
  const { body } = req.body;
  const result = await CourseServices.updateCourseIntoDB(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course  is updated successfully',
    data: result,
  });


})

const deleteCourse = catchAsync(async (req, res, next) => {
    const { id} = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Course is deleted successfully',
      data: result,
    })
  })
const assignFacultiesWithCourse = catchAsync(async (req, res, next) => {
    const { courseId} = req.params;
    const {faculties} = req.body?.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculties assigned successfully',
      data: result,
    })
  })
const removeFacultiesFromCourse = catchAsync(async (req, res, next) => {
    const { courseId} = req.params;
    const {faculties} = req.body?.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId, faculties);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculties removed successfully',
      data: result,
    })
  })


export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
