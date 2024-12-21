import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // checking if user exists

  const isUserExists = await UserModel.isUserExistsByCustomId(payload?.id);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  //checking if the user already deleted
  const isDeleted = isUserExists?.isDeleted

  if(isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!')
  }
  //checking if the user status blocked
  const userStatus = isUserExists?.status;

  if(userStatus === 'blocked') {
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
const jwtPayload =  {
  userId: isUserExists?.id,
  role: isUserExists?.role,
}

const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

  return {
    accessToken,
    needsPasswordChange: isUserExists?.needsPasswordChange
  };
};




const changePassword = async (userData: JwtPayload, payload:{oldPassword: string; newPassword: string}) => {
  const isUserExists = await UserModel.isUserExistsByCustomId(userData?.userId);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  //checking if the user already deleted
  const isDeleted = isUserExists?.isDeleted

  if(isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!')
  }
  //checking if the user status blocked
  const userStatus = isUserExists?.status;

  if(userStatus === 'blocked') {
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
const newHashedPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_round))

   await UserModel.findOneAndUpdate({
    id: userData?.userId,
    role: userData?.role,
  }, {
    password:newHashedPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  })


  return null;

}

export const AuthServices = {
  loginUser,
  changePassword
};
