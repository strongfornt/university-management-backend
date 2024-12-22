import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if user exists

  const isUserExists = await UserModel.isUserExistsByCustomId(payload?.id);

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

  // // checking if the password is correct
  //   const isPasswordCorrect = await bcrypt.compare(payload?.password, isUserExists?.password)
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      isUserExists?.password,
    ))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }
  // console.log(isPasswordCorrect);

  //create token and send to the client
  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExists = await UserModel.isUserExistsByCustomId(userData?.userId);

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

  // // checking if the password is correct
  //   const isPasswordCorrect = await bcrypt.compare(payload?.password, isUserExists?.password)
  if (
    !(await UserModel.isPasswordMatched(
      payload?.oldPassword,
      isUserExists?.password,
    ))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  // hash new password before update
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
    //checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
    const {  userId, iat } = decoded;

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


    //create token and send to the client
  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken
  }

}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken
};
