import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/user.entity';
import { UserFactoryService } from './user-factory.service';
import { CreateUserDto } from 'src/core/dtos/user.dto';

@Injectable()
export class UserUseCases {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userFactoryService: UserFactoryService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);

    return this.userRepository.save(user);
  }
}
