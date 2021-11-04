import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '../../controllers/users/dto/update-user.dto';
@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    //! TODO : Add hash password , this is for simple
    const user = await this.userRepo.findOne(email);
    if (user && user.password == password) {
      // const { password, ...result } = user;
      // return result;
      return user;
    }
    return null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.dtoToUser(createUserDto);
    await this.userRepo.insert(user);
    // console.log(result);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepo.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepo.update({ id: id }, { ...updateUserDto });
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepo.delete({ id: id });
  }

  private dtoToUser(dto: CreateUserDto): User {
    const user: User = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.displayName = dto.displayName;
    user.birthDate = dto.dateOfBirth;
    user.gender = dto.gender;

    return user;
  }
}
