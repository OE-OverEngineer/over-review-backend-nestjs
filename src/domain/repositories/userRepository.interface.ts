import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';

export interface IUsersRepository {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: number, updateUserDto: CreateUserDto): Promise<User>;
  updateProfile(id: number, updateUserDto: RegisterUserDto): Promise<User>;
  deleteById(id: number): Promise<void>;
  findTopReviewers(amount: number): Promise<User[]>;
}
