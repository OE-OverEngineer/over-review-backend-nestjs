import { User } from 'src/infrastructure/entities/user.entity';

export interface IAuthRepository {
  validateUser(email: string, password: string): Promise<User | undefined>;
}
