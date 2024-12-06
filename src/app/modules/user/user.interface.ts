export interface TUser {
    id: string ;
    password: string;
    needsPasswordChange: boolean;
    role: 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}

// export interface NewUser  {
//     password: string;
//     role: string;
//     id:string
// }