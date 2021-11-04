import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepo: AuthRepository) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authRepo.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
