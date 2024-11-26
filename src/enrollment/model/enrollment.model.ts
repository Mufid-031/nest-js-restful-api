/* eslint-disable prettier/prettier */
export const EnrollmentRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      studentId: { type: 'number', example: 1 },
      scheduleId: { type: 'number', example: 1 },
    },
    required: ['studentId', 'scheduleId'],
  },
};

export const EnrollmentResponseRegister = {
  status: 201,
  description: 'Success register course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success register course' },
      data: {
        type: 'object',
        properties: {
          studentId: { type: 'number', example: 1 },
          scheduleId: { type: 'number', example: 1 },
          grade: { type: 'number', example: 0 },
          schedule: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              day: { type: 'string', example: 'Monday' },
              time: { type: 'string', example: '08:00' },
              courseId: { type: 'number', example: 1 },
              course: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  name: { type: 'string', example: 'Math' },
                  code: { type: 'string', example: 'MATH101' },
                  teacherId: { type: 'number', example: 1 },
                  semester: { type: 'string', example: 'SEMESTER_1' },
                  sks: { type: 'number', example: 3 },
                  programStudi: {
                    type: 'string',
                    example: 'Teknik Informatika',
                  },
                  createdAt: {
                    type: 'string',
                    example: '2020-01-01T00:00:00.000Z',
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2020-01-01T00:00:00.000Z',
                  },
                },
              },
              createdAt: {
                type: 'string',
                example: '2020-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2020-01-01T00:00:00.000Z',
              },
            },
          },
          createdAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2020-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export const EnrollmentRequestRegisterMany = {
  schema: {
    type: 'object',
    properties: {
      studentId: { type: 'number' },
      coursesId: {
        type: 'array',
        items: { type: 'number', example: 1 },
      },
    },
    required: ['studentId', 'coursesId'],
  },
};

export const EnrollmentResponseRegisterMany = {
  status: 201,
  description: 'Success register course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success register course' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            scheduleId: { type: 'number', example: 1 },
            grade: { type: 'number', example: 0 },
            createdAt: {
              type: 'string',
              example: '2020-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2020-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
  },
};

