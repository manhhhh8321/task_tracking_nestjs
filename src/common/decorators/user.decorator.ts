import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/interfaces/main';

export const User = createParamDecorator<any, any, Users>((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return data ? user?.[data] : user;
});
