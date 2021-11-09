import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../controllers/users/dto/createUser.dto';
import { UpdateUserDto } from '../../controllers/users/dto/updateUser.dto';
@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.dtoToUser(createUserDto);
    await this.userRepository.insert(user);
    // console.log(result);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ id: id }, { ...updateUserDto });
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id: id });
  }

  private dtoToUser(dto: CreateUserDto): User {
    const user: User = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.displayName = dto.displayName;
    user.dateOfBirth = dto.dateOfBirth;
    user.gender = dto.gender;
    user.avatar = dto.avatar;

    return user;
  }
}
