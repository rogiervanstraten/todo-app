import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { UserUseCases } from 'src/use-cases/user/user.use-cases';
import { UUIDParam } from 'src/utils/params';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  findAll() {
    return this.userUseCases.findAll();
  }

  @Get(':id')
  findOne(@UUIDParam('id') id: string) {
    return this.userUseCases.findOne(id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userUseCases.createUser(userDto);
  }
}
