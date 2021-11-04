import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/infrastructure/controllers/users/dto/updateUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';

export interface IUsersRepository {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
  deleteById(id: number): Promise<void>;
}
