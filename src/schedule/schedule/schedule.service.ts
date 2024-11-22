/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ScheduleService as ScheduleValidationService } from 'src/validation/schedule/schedule.service';

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

@Injectable()
export class ScheduleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly ScheduleValidationService: ScheduleValidationService,
  ) {}

  async create(
    courseId: number,
    day: DayOfWeek,
    time: string,
    room: string,
  ): Promise<ScheduleResponse> {
    const requestCreate = this.ScheduleValidationService.create(
      courseId,
      day,
      time,
      room,
    );

    const schedule = await this.prismaService.schedule.create({
      data: {
        courseId: requestCreate.courseId,
        day: requestCreate.day,
        time: requestCreate.time,
        room: requestCreate.room,
      },
    });

    return {
      status: 201,
      message: 'Schedule created successfully',
      data: schedule,
    };
  }

  async update(
    id: number,
    day?: DayOfWeek,
    time?: string,
    room?: string,
  ): Promise<ScheduleResponse> {
    const requestUpdate = this.ScheduleValidationService.update(
      id,
      day,
      time,
      room,
    );

    const shcedule = await this.prismaService.schedule.findUnique({
      where: {
        id: requestUpdate.id,
      },
    });

    if (requestUpdate.day) {
      shcedule.day = requestUpdate.day;
    }

    if (requestUpdate.time) {
      shcedule.time = requestUpdate.time;
    }

    if (requestUpdate.room) {
      shcedule.room = requestUpdate.room;
    }

    const update = await this.prismaService.schedule.update({
        where: {
            id: requestUpdate.id,
        },
        data: shcedule
    });

    return {
      status: 201,
      message: 'Schedule updated successfully',
      data: update,
    };
  }

  async delete(id: number): Promise<ScheduleResponse> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: id,
      },
    });

    if (!schedule) {
      throw new ErrorService(404, 'Schedule not found');
    }

    const deleteSchedule = await this.prismaService.schedule.deleteMany({
        where: {
            id: schedule.id
        }
    });

    return {
      status: 201,
      message: 'Schedule deleted successfully',
      data: schedule,
    }
  }
}
