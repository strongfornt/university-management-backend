import { Model } from "mongoose";

export interface TUser {
    id: string ;
    password: string;
    needsPasswordChange: boolean;
    role: 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}



export  interface UserModelInterFace extends Model<TUser> {
    // myStaticMethod(): number;
    isUserExistsByCustomId(id: string) :Promise<TUser>
    isPasswordMatched(plainTextPass: string, hashTextPass: string) : Promise<boolean>
}

// export interface NewUser  {
//     password: string;
//     role: string;
//     id:string
// }