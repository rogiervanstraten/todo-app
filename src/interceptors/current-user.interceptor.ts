/**
 * Interceptor to decorate the request with a "currentUser"
 * which is always the first for this demo
 *
 * TODO replace interceptor with some JWT Authentication middleware
 */
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  createParamDecorator,
} from '@nestjs/common';
import { IUserService } from 'src/core/abstracts/user-service.interface';
import { User } from 'src/core/entities/user.entity';

@Injectable()
// A demo currentUser interceptor to decorate the request with a "currentUser"
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: IUserService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const user = (await this.userService.findAll())?.[0];
    request.currentUser = user;

    return handler.handle();
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest();

    return request.currentUser;
  },
);
