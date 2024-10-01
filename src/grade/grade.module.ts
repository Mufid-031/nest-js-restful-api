/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GradeController } from './grade/grade.controller';
import { GradeService } from './grade/grade.service';

@Module({
  controllers: [GradeController],
  providers: [GradeService]
})
export class GradeModule {}
