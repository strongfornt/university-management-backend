import { Router } from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academic-semester/academic-samester-route';
import { AcademicFacultyRoute } from '../modules/academic-faculty/academic-faculty.route';
import { AcademicDepartmentRoute } from '../modules/academic-department/academic-department.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
