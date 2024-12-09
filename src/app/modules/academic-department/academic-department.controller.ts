// import { UserService } from './user.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { AcademicDepartmentService } from './academic-department.service';


const createAcademicDepartment = catchAsync( async (
  req,
  res,
  next
) => {
  
  // console.log(req.body);
  const {body} = req.body;
  
    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic department is Created successfully',
      data: result,
    });
});

const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic department are retrieved successfully',
    data: result,
  });
})

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  console.log(departmentId);
  const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result,
  })
})

const updateSingleAcademicDepartment = catchAsync(async (req, res,next) => {
  const { departmentId } = req.params;
  const { body } = req.body;
  const result = await AcademicDepartmentService.updateSingleAcademicDepartmentFromDB(departmentId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic department  is updated successfully',
    data: result,
  });


})


export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
 
};
