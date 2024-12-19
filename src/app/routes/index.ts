import { Router } from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academic-semester/academic-samester-route';
import { AcademicFacultyRoute } from '../modules/academic-faculty/academic-faculty.route';
import { AcademicDepartmentRoute } from '../modules/academic-department/academic-department.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.router';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoute } from '../modules/course/course.route';
import { semesterRegistrationRoute } from '../modules/samester-registration/semester-registration.route';
import { offeredCourseRoutes } from '../modules/offeredCourse/offered-course.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
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
  {
    path: '/courses',
    route:CourseRoute,
  },
  {
    path: '/semester-registrations',
    route:semesterRegistrationRoute,
  },
  {
    path: '/offered-courses',
    route:offeredCourseRoutes,
  },
  {
    path:'/auth',
    route:AuthRoutes
  }
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
