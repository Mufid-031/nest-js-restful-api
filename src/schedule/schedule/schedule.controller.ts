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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
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

@ApiTags('Schedule')
@Controller('/api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Schedule' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        courseId: {
          type: 'number',
          example: 1,
        },
        day: {
          type: 'string',
          example: 'MONDAY',
        },
        time: {
          type: 'string',
          example: '08:00',
        },
        room: {
          type: 'string',
          example: 'R1',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Schedule created successfully',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          example: 201,
        },
        message: {
          type: 'string',
          example: 'Schedule created successfully',
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            courseId: {
              type: 'number',
              example: 1,
            },
            day: {
              type: 'string',
              example: 'MONDAY',
            },
            time: {
              type: 'string',
              example: '08:00',
            },
            room: {
              type: 'string',
              example: 'R1',
            },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Update Schedule' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        day: {
          type: 'string',
          example: 'MONDAY',
        },
        time: {
          type: 'string',
          example: '08:00',
        },
        room: {
          type: 'string',
          example: 'R1',
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Delete schedule' })
  @ApiHeader({
    name: 'X-API-TOKEN',
    description: 'X-API-TOKEN',
    required: true,
    example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
  })
  @ApiParam({
    name: 'id',
    description: 'id from request param',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: 'Success to delete schedule',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          example: 201,
        },
        message: {
          type: 'string',
          example: 'Success delete schedule',
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            courseId: {
              type: 'number',
              example: 1,
            },
            day: {
              type: 'string',
              example: 'MONDAY',
            },
            time: {
              type: 'string',
              example: '08:00',
            },
            room: {
              type: 'string',
              example: 'S1',
            },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
  })
  async delete(@Param('id') id: number): Promise<ScheduleResponse> {
    return await this.scheduleService.delete(id);
  }
}
