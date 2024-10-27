/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
