import { model, Schema } from 'mongoose';
import { TUser, UserModelInterFace } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModelInterFace>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  //hashing pass and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await this.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPass,
  hashTextPass,
) {
  return await bcrypt.compare(plainTextPass, hashTextPass);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passChangeTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime = new Date(passChangeTimeStamp).getTime() / 1000;
 const time = passwordChangedTime > jwtIssuedTimeStamp
  // console.log('from 77', time);
  
  return time;
};

export const UserModel = model<TUser, UserModelInterFace>('User', userSchema);
