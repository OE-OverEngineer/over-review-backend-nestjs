import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: IUsersRepository) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    // TODO : Add hash password , this is for simple
    console.log(email);
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password == password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
