import { ApiBodyOptions } from '@nestjs/swagger';

export const loginBodySchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        default: 'user123',
      },
      password: {
        type: 'string',
        default: 'userpassword',
      },
    },
  },
};
