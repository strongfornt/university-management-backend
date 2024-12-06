import { TAcademicSemesterCode, TAcademicSemesterCodeMapper, TAcademicSemesterName, TMonth } from "./academicSamester-interface";

 export const months: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  export const AcademicSemesterName: TAcademicSemesterName[]= ["Autumn" , "Summer" , "Fall"]
  export const AcademicSemesterCode: TAcademicSemesterCode[]= ["01" , "02" , "03"]

    //semester name ==== semester code
 
    export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
      'Autumn': '01',
      'Summer': '02',
      'Fall': '03',
    }
  