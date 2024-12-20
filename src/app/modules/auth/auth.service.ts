import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // checking if user exists

  const isUserExits = await UserModel.isUserExistsByCustomId(payload?.id);

  if (!isUserExits) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  //checking if the user already deleted
  const isDeleted = isUserExits?.isDeleted

  if(isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!')
  }
  // //checking if the user status blocked
  // const userStatus = isUserExists?.status;

  // if(userStatus === 'blocked') {
  //     throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  // }

  // // checking if the password is correct
  //   const isPasswordCorrect = await bcrypt.compare(payload?.password, isUserExists?.password)
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      isUserExits?.password,
    ))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }
  // console.log(isPasswordCorrect);

  return {};
};

export const AuthServices = {
  loginUser,
};
