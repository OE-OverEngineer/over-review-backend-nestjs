import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';

export class UsersUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
}
