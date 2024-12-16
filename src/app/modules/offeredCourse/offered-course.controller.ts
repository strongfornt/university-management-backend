import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offered-course.service";

const createOfferedCourse = catchAsync(async (req, res, next) => {
    const {body} = req.body;
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Offered Course is created successfully',
        data: result,
      });
})


export const OfferedCourseControllers = {
    createOfferedCourse,
 
}

