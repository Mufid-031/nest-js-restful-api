/* eslint-disable prettier/prettier */
export const TeacherRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'V9xv2@example.com' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['name', 'email', 'password'],
  },
};

export const TeacherResponseRegister = {
  status: 201,
  description: 'Success Register Teacher',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success Register Teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'XHkQO@example.com' },
          teacher: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nip: { type: 'string', example: '1234567890' },
              gelar: { type: 'string', example: 'Profesor' },
              keahlian: { type: 'string', example: 'Web Programmer' },
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
          role: { type: 'string', example: 'TEACHER' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          token: { type: 'string', example: null },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const TeacherRequestLogin = {
  schema: {
    type: 'object',
    properties: {
      nip: { type: 'string', example: '1234567890' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['nip', 'password'],
  },
};

export const TeacherResponseLogin = {
  status: 200,
  description: 'Success Login Teacher',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success Login Teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'XHkQO@example.com' },
          teacher: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nip: { type: 'string', example: '1234567890' },
              gelar: { type: 'string', example: 'Profesor' },
              keahlian: { type: 'string', example: 'Web Programmer' },
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
          role: { type: 'string', example: 'TEACHER' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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

export const TeacherResponseLogout = {
  status: 200,
  description: 'Success Logout Teacher',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success Logout Teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'XHkQO@example.com' },
          teacher: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nip: { type: 'string', example: '1234567890' },
              gelar: { type: 'string', example: 'Profesor' },
              keahlian: { type: 'string', example: 'Web Programmer' },
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
          role: { type: 'string', example: 'TEACHER' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          token: { type: 'string', example: null },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const TeacherResponseGetTeachers = {
  status: 200,
  description: 'Success Get All Teachers',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success Get All Teachers' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'XHkQO@example.com' },
            teacher: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                userId: { type: 'number', example: 1 },
                nip: { type: 'string', example: '1234567890' },
                gelar: { type: 'string', example: 'Profesor' },
                keahlian: { type: 'string', example: 'Web Programmer' },
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
            role: { type: 'string', example: 'TEACHER' },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
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

export const TeacherRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'XHkQO@example.com' },
      password: { type: 'string', example: 'password123' },
      gelar: { type: 'string', example: 'Profesor' },
      keahlian: { type: 'string', example: 'Web Programmer' },
    },
  },
};

export const TeacherResponseUpdate = {
  status: 201,
  description: 'Success Update Teacher',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success Update Teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'XHkQO@example.com' },
          teacher: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nip: { type: 'string', example: '1234567890' },
              gelar: { type: 'string', example: 'Profesor' },
              keahlian: { type: 'string', example: 'Web Programmer' },
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
          role: { type: 'string', example: 'TEACHER' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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

export const TeacherRequestDelete = {
  name: 'id',
  description: 'Teacher ID',
  required: true,
  example: '1',
};

export const TeacherResponseDelete = {
  status: 201,
  description: 'Success Delete Teacher',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success Delete Teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'XHkQO@example.com' },
          teacher: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nip: { type: 'string', example: '1234567890' },
              gelar: { type: 'string', example: 'Profesor' },
              keahlian: { type: 'string', example: 'Web Programmer' },
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
          role: { type: 'string', example: 'TEACHER' },
          createdAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2022-01-01T00:00:00.000Z' },
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

export const TeacherResponseGetTeacher = {
  status: 200,
  description: 'Success Get Teacher',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success Get Teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'XHkQO@example.com' },
          teacher: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nip: { type: 'string', example: '1234567890' },
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
    },
  },
};
