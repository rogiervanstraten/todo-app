import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities/user.entity';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { IUserService } from 'src/core/abstracts/user-service.interface';

@Injectable()
export class UserUseCases {
  constructor(private userService: IUserService) {}

  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
