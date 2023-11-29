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
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
// A demo currentUser interceptor to decorate the request with a "currentUser"
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const user = (await this.userRepository.find({ take: 1 }))?.[0];
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
