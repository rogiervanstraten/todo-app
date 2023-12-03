import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/core/abstracts/user-service.interface';
import { CreateUserDto, PatchUserDto } from 'src/core/dtos/user.dto';
import { User } from 'src/core/entities/user.entity';
import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(args?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(args);
  }

  findOne(args: FindOptionsWhere<User>): Promise<User | undefined> {
    return this.userRepository.findOneBy(args);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.fullName = createUserDto.fullName;

    const user = this.userRepository.save(newUser);

    return user;
  }

  async patchUser(id: string, patch: PatchUserDto): Promise<User> {
    await this.userRepository.update(id, patch);

    return this.userRepository.findOneBy({ id });
  }
}
