import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';
import { Service } from 'typedi';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/infrastructure/dto/auth/registerUser.dto';
// import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';

@Service('UsersUseCase')
@Injectable()
export class UsersUseCases {
  constructor(private readonly userRepository: IUsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async update(id: number, dto: CreateUserDto): Promise<void> {
    await this.userRepository.update(id, dto);
  }
  async updateProfile(id: number, dto: RegisterUserDto): Promise<void> {
    await this.userRepository.updateProfile(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findTopReviewers(amount: number): Promise<User[]> {
    return await this.userRepository.findTopReviewers(amount);
  }
}
