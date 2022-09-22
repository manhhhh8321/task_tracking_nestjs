import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/interfaces/main';

import { decode } from 'jsonwebtoken';
import { ErrorHelper } from 'src/helpers/error.utils';
export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const id = request.params.id;
  const { JWT } = request.cookies;

  const token = JWT.split(' ')[1];
  const encoded = decode(token);

  const request_id = encoded['id'];

  if (id !== request_id) {
    throw ErrorHelper.UnauthorizedException('Unauthorized');
  }
});
