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
import { ExceptionModule } from './exception/exception.module';
import { ConfigModule } from '@nestjs/config';
import { AbsensiModule } from './absensi/absensi.module';
import { BeasiswaModule } from './beasiswa/beasiswa.module';
import { BeritaModule } from './berita/berita.module';
import { PembayaranModule } from './pembayaran/pembayaran.module';
import { KritikSaranModule } from './kritik-saran/kritik-saran.module';
import { AlumniModule } from './alumni/alumni.module';

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
    ExceptionModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AbsensiModule,
    BeasiswaModule,
    BeritaModule,
    PembayaranModule,
    KritikSaranModule,
    AlumniModule,
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
