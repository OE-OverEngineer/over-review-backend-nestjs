import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersUseCases } from 'src/usecases/users.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userUsecases: UsersUseCases) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userUsecases.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userUsecases.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async me(@Request() req) {
    const user = await this.userUsecases.findOne(req.user.id);
    console.log(req.user);
    return user;
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
