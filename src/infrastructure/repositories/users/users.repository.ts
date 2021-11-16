import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { Role } from 'src/infrastructure/entities/role.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../controllers/users/dto/createUser.dto';
import { UpdateUserDto } from '../../controllers/users/dto/updateUser.dto';

@Injectable()
@Service()
export class DatabaseUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const dto = this.dtoToUser(createUserDto);
    const user = await this.userRepository.save(dto);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      select: ['password'],
      where: { email: email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    // user.avatar =
    // user = {
    //   ...updateUserDto,
    // };
    // const user = this.userRepository.save(findUser);
    return await this.userRepository.save(user);
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id: id });
  }

  private dtoToUser(dto: CreateUserDto): User {
    const role: Role = new Role();
    role.id = dto.roleID;
    const user: User = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.displayName = dto.displayName;
    user.dateOfBirth = dto.dateOfBirth;
    user.gender = dto.gender;
    user.avatar = dto.avatar;
    // user.role = role;
    return user;
  }

  // private dtoToUser(dto: UpdateUserDto): User {
  //   const role: Role = new Role();
  //   role.id = dto.roleID;
  //   const user: User = new User();
  //   user.email = dto.email;
  //   user.password = dto.password;
  //   user.firstName = dto.firstName;
  //   user.lastName = dto.lastName;
  //   user.displayName = dto.displayName;
  //   user.dateOfBirth = dto.dateOfBirth;
  //   user.gender = dto.gender;
  //   user.avatar = dto.avatar;
  //   user.role = role;
  //   return user;
  // }
}
