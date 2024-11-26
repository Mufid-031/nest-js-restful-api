/* eslint-disable prettier/prettier */
export const ScheduleRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      courseId: { type: 'number', example: 1 },
      day: { type: 'string', example: 'MONDAY' },
      time: { type: 'string', example: '08:00' },
      room: { type: 'string', example: 'R1' },
    },
  },
};

export const ScheduleResponseCreate = {
  status: 201,
  description: 'Schedule created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Schedule created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          courseId: { type: 'number', example: 1 },
          day: { type: 'string', example: 'MONDAY' },
          time: { type: 'string', example: '08:00' },
          room: { type: 'string', example: 'R1' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export const ScheduleRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      day: { type: 'string', example: 'MONDAY' },
      time: { type: 'string', example: '08:00' },
      room: { type: 'string', example: 'R1' },
    },
  },
};

export const ScheduleResponseUpdate = {
  status: 201,
  description: 'Schedule created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Schedule created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          courseId: { type: 'number', example: 1 },
          day: { type: 'string', example: 'MONDAY' },
          time: { type: 'string', example: '08:00' },
          room: { type: 'string', example: 'R1' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export const ScheduleRequestDelete = {
  name: 'id',
  description: 'id from request param',
  required: true,
  example: 1,
};

export const ScheduleResponseDelete = {
  status: 201,
  description: 'Success to delete schedule',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success delete schedule' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          courseId: { type: 'number', example: 1 },
          day: { type: 'string', example: 'MONDAY' },
          time: { type: 'string', example: '08:00' },
          room: { type: 'string', example: 'S1' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};
