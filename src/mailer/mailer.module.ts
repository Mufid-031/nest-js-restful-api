/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';

@Module({
  exports: [MailerService],
  providers: [MailerService]
})
export class MailerModule {}
