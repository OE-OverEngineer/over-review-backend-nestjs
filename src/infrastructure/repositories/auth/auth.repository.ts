import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthRepository {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    // TODO : Add hash password , this is for simple
    const user = await this.userRepo.findOne(email);
    if (user && user.password == password) {
      // const { password, ...result } = user;
      // return result;
      return user;
    }
    return null;
  }
}
