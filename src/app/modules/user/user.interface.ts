import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id: string ;
    password: string;
    needsPasswordChange: boolean;
    passwordChangeAt?:Date;
    role: 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}



export interface UserModelInterFace extends Model<TUser> {
    // myStaticMethod(): number;
    isUserExistsByCustomId(id: string) :Promise<TUser>
    isPasswordMatched(plainTextPass: string, hashTextPass: string) : Promise<boolean>
    isJWTIssuedBeforePasswordChanged (passChangeTimeStamp: Date, jwtIssuedTimeStamp: number) : boolean
}

// export interface NewUser  {
//     password: string;
//     role: string;
//     id:string
// }

export type TUserRole = keyof typeof USER_ROLE