/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from '@prisma/client';

interface ScheduleResponse {
  status: number;
  message: string;
  data?: Schedule | Schedule[];
}

enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Controller('/api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async create(
    @Body('courseId') courseId: number,
    @Body('day') day: DayOfWeek,
    @Body('time') time: string,
    @Body('room') room: string,
  ): Promise<ScheduleResponse> {
    return await this.scheduleService.create(courseId, day, time, room);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async update(
    @Body('id') id: number,
    @Body('day') day?: DayOfWeek,
    @Body('time') time?: string,
    @Body('room') room?: string,
  ): Promise<ScheduleResponse> {
    return await this.scheduleService.update(id, day, time, room);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async delete(@Param('id') id: number): Promise<ScheduleResponse> {
    return await this.scheduleService.delete(id);
  }
}
