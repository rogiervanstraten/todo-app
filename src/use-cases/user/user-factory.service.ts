import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities/user.entity';
import { CreateUserDto } from 'src/core/dtos/user.dto';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.fullName = createUserDto.fullName;

    return newUser;
  }
}
