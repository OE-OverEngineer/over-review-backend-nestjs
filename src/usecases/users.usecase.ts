import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';
import { validate } from 'class-validator';
import { Service } from 'typedi';
import { Injectable } from '@nestjs/common';
@Service()
@Injectable()
export class UsersUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    const errors = await validate(dto);
    console.log(errors);

    if (errors.length > 0) {
      errors.forEach(console.log);
    } else {
      await this.userRepository.create(dto);
    }
  }

  async update(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
  async delete(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
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
}
