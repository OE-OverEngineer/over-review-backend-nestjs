import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersUseCases } from 'src/usecases/users.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly userUsecases: UsersUseCases) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userUsecases.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userUsecases.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findById(Number.parseInt(id));
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.deleteById(+id);
  // }
}
