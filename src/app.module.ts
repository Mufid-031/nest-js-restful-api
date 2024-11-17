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
import { RecoveryMiddleware } from './middleware/recovery/recovery.middleware';
import { UserModule } from './user/user.module';
import { ExceptionModule } from './exception/exception.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

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
    UserModule,
    ExceptionModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
