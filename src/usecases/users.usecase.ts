import { ILogger } from 'src/domain/logger/logger.interface';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { UsersRepository } from 'src/infrastructure/repositories/users/users.repository';

export class UsersUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
}
