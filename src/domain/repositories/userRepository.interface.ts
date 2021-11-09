import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/infrastructure/controllers/users/dto/update-user.dto';
import { User } from 'src/infrastructure/entities/user.entity';

export interface IUsersRepository {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
  deleteById(id: number): Promise<void>;
}
