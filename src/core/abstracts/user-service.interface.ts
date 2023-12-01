import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export abstract class IUserService {
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User | undefined>;
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;
}
