import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res, next) => {
    const {body} = req.body;
    const result = await AuthServices.loginUser(body) 
    const {refreshToken, accessToken, needsPasswordChange} = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User is logged in successfully',
        data: {
            accessToken,
            needsPasswordChange
        },
      });
})
const changePassword = catchAsync(async (req, res, next) => {
    const {body} = req.body;
    const result = await AuthServices.changePassword(req.user as JwtPayload, body) 
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password is updated successfully',
        data: result
      });
})

const refreshToken = catchAsync(async (req, res, next) => {
    const {refreshToken} = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken) 
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Access token is retrieved successfully',
        data: result
      });
})


export const AuthController = {
    loginUser,
    changePassword,
    refreshToken
}