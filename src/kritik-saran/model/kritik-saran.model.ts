/* eslint-disable prettier/prettier */
export const KritikSaranRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      pesan: { type: 'string', example: 'Webnya keren' },
      type: { type: 'string', example: 'KRITIK | SARAN' },
    },
    required: ['pesan', 'type'],
  },
};

export const KritikSaranResponseCreate = {
  status: 201,
  description: 'Kritik saran created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Kritik saran created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          pesan: { type: 'string', example: 'Webnya keren' },
          type: { type: 'string', example: 'KRITIK | SARAN' },
        },
      },
    },
  },
};

export const KritikSaranRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      pesan: { type: 'string', example: 'Webnya keren' },
      type: { type: 'string', example: 'KRITIK | SARAN' },
    },
  },
};

export const KritikSaranResponseUpdate = {
  status: 201,
  description: 'Kritik saran updated successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Kritik saran updated successfully' },
    },
  },
};

export const KritikSaranResponseDelete = {
  status: 201,
  description: 'Kritik saran deleted successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Kritik saran deleted successfully' },
    },
  },
};

export const KritikSaranResponseGetAll = {
  status: 200,
  description: 'Kritik saran get all successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Kritik saran get all successfully' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            pesan: { type: 'string', example: 'Webnya keren' },
            type: { type: 'string', example: 'KRITIK | SARAN' },
          },
        },
      },
    },
  },
};
