/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ValidationModule } from './validation/validation.module';
import { PrismaModule } from './prisma/prisma.module';
import { ErrorModule } from './error/error.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    AdminModule,
    CourseModule,
    EnrollmentModule,
    PrismaModule,
    ValidationModule.forRoot(),
    ErrorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL,
    });
  }
}
