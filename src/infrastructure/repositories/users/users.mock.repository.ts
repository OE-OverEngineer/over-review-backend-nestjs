import { Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';

// import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';
import { Service } from 'typedi';
@Injectable()
@Service()
export class MockUsersRepository implements IUsersRepository {
  constructor(private readonly roleRepository: IRoleRepository) {}
  updateProfile(id: number, updateUserDto: RegisterUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findTopReviewers(amount: number): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [];
  create(dto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
