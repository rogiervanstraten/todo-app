import { CreateUserDto, PatchUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { FindOptionsWhere, FindManyOptions } from 'typeorm';

export abstract class IUserService {
  abstract findAll(args?: FindManyOptions<User>): Promise<User[]>;
  abstract findOne(args: FindOptionsWhere<User>): Promise<User | undefined>;
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;
  abstract patchUser(id: string, patchUserDto: PatchUserDto): Promise<User>;
}
