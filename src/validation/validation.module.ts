/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { AdminService } from './admin/admin.service';
import { CourseService } from './course/course.service';
import { EnrollmentService } from './enrollment/enrollment.service';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  providers: [
    AdminService,
    TeacherService,
    StudentService,
    EnrollmentService,
    CourseService,
    ScheduleService,
  ],
})
export class ValidationModule {
  static forRoot(): DynamicModule {
    return {
      module: ValidationModule,
      global: true,
      providers: [
        ValidationService,
        AdminService,
        TeacherService,
        StudentService,
        EnrollmentService,
        CourseService,
        ScheduleService,
      ],
      exports: [
        ValidationService,
        AdminService,
        TeacherService,
        StudentService,
        EnrollmentService,
        CourseService,
        ScheduleService,
      ],
    };
  }
}
