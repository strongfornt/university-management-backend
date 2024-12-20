import { model, Schema } from 'mongoose';
import { TUser, UserModelInterFace } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModelInterFace>(
  {
    id: {
      type: String  ,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
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
    versionKey:false
  },
);

userSchema.pre('save', async function(next){
  
  const user = this;
//hashing pass and save into db
user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round));
next();
  
})

userSchema.post('save', function(doc,next) {
  doc.password=''
  next()
})

userSchema.statics.isUserExistsByCustomId = async function(id: string) {
  return await this.findOne({ id });
};

userSchema.statics.isPasswordMatched = async function(plainTextPass, hashTextPass) {
 return await bcrypt.compare(plainTextPass, hashTextPass)
}

export const UserModel = model<TUser, UserModelInterFace>('User', userSchema);
