/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { ScheduleModule } from './schedule/schedule.module';
import { MailerModule } from './mailer/mailer.module';
import { RecoveryMiddleware } from './middleware/recovery/recovery.middleware';
import { UserModule } from './user/user.module';

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
    ScheduleModule,
    MailerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '/api/*',
        method: RequestMethod.ALL,
      })
      .apply(RecoveryMiddleware)
      .forRoutes({
        path: '/api/user/recovery',
        method: RequestMethod.GET,
      });
  }
}
