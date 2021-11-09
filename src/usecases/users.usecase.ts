import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/create-user.dto';

export class UsersUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
  }
}
