import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { User } from 'src/core/entities/user.entity';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { UserUseCases } from 'src/use-cases/user/user.use-cases';
import { UUIDParam } from 'src/utils/params';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  findAll() {
    return this.userUseCases.findAll();
  }

  @Get('me')
  me(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Get(':id')
  findOne(@UUIDParam('id') id: string) {
    return this.userUseCases.findOne(id);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userUseCases.createUser(userDto);
  }
}
