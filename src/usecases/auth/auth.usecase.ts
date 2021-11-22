import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from 'src/infrastructure/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    // TODO : Add hash password , this is for simple
    console.log(email);
    const user = await this.userRepository.findByEmail(email);
    console.log('User = ', user);
    if (user && user.password == password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log(user);
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
