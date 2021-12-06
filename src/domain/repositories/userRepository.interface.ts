import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
// import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';

export interface IUsersRepository {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  updateProfile(id: number, updateUserDto: RegisterUserDto): Promise<User>;
  deleteById(id: number): Promise<void>;
  findTopReviewers(amount: number): Promise<User[]>;
}
