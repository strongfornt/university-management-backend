import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
    const {body} = req.body;
    const result = await AuthServices.loginUser(body) 
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User is logged in successfully',
        data: result,
      });
})
const changePassword = catchAsync(async (req, res, next) => {
    const {body} = req.body;
    const result = await AuthServices.changePassword(req.user as JwtPayload, body) 
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password is updated successfully',
        data: result,
      });
})


export const AuthController = {
    loginUser,
    changePassword
}