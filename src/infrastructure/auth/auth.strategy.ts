import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUseCase } from 'src/usecases/auth/auth.usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authUseCase: AuthUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authUseCase.validateUserByPassword(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
