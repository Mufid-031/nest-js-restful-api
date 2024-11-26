/* eslint-disable prettier/prettier */
export const StudentRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'V9xv2@example.com' },
      password: { type: 'string', example: 'password123' },
      nim: { type: 'string', example: '12345678' },
      programStudy: { type: 'string', example: 'Teknik Informatika' },
    },
    required: ['name', 'email', 'password', 'nim'],
  },
};

export const StudentResponseRegister = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Student created successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};

export const StudentRequestLogin = {
  schema: {
    type: 'object',
    properties: {
      nim: { type: 'string', example: '12345678' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['nim', 'password'],
  },
};

export const StudentResponseLogin = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Login success' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: 'token',
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};

export const StudentResponseLogout = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'success logout student' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};

export const StudentResponseGetStudents = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'success get all students' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'YqyZ4@example.com' },
            student: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1,
                },
                userId: {
                  type: 'number',
                  example: 1,
                },
                nim: {
                  type: 'string',
                  example: '123456789',
                },
                statusStudent: {
                  type: 'string',
                  example: 'ACTIVE',
                },
                programStudi: {
                  type: 'string',
                  example: 'Teknik Informatika',
                },
                createdAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
              },
            },
            createAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            token: {
              type: 'string',
              example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
            },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  },
};

export const StudentRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'YqyZ4@example.com' },
      password: { type: 'string', example: 'password123' },
    },
  },
};

export const StudentResponseUpdate = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'success update student' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'YqyZ4@example.com' },
          student: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nim: { type: 'string', example: '123456789' },
              statusStudent: {
                type: 'string',
                example: 'ACTIVE',
              },
              programStudi: {
                type: 'string',
                example: 'Teknik Informatika',
              },
              createdAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
            },
          },
          createAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          updatedAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          token: {
            type: 'string',
            example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
          },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const StudentRequestDelete = {
  name: 'id',
  type: 'number',
  required: true,
  example: 1,
};

export const StudentResponseDelete = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'success delete student' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'YqyZ4@example.com' },
          student: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nim: { type: 'string', example: '123456789' },
              statusStudent: {
                type: 'string',
                example: 'ACTIVE',
              },
              programStudi: {
                type: 'string',
                example: 'Teknik Informatika',
              },
              createdAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
            },
          },
          createdAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          token: {
            type: 'string',
            example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
          },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const StudentResponseGetStudent = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Login success' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: 'token',
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};
