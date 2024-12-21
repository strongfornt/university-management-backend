import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catch-async';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

const authMiddleware = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //if the token sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    //checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;

    const isUserExists = await UserModel.isUserExistsByCustomId(userId);

    if (!isUserExists) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    //checking if the user already deleted
    const isDeleted = isUserExists?.isDeleted;

    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
    }
    //checking if the user status blocked
    const userStatus = isUserExists?.status;

    if (userStatus === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
    }


    if (
      isUserExists.passwordChangeAt &&
      await UserModel.isJWTIssuedBeforePasswordChanged(
        isUserExists.passwordChangeAt,
        iat as number,
      ) 
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authMiddleware;
