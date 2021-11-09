import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { User } from 'src/infrastructure/entities/user.entity';

export class UsersUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
  async update(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
  async delete(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findById(id);
    return user;
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
