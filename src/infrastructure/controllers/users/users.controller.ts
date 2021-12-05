import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { UsersUseCases } from 'src/usecases/users/users.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userUsecases: UsersUseCases,
    private readonly reviewsUsecases: ReviewsUseCases,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userUsecases.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userUsecases.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async me(@Request() req) {
    const user = await this.userUsecases.findOne(req.user.id);
    return user;
  }

  @Get('/:id/reviews')
  async findReviewFromID(
    @Query() pagintaion: Pagination,
    @Param('id') id: number,
  ) {
    return this.reviewsUsecases.findAllByUserID(id, pagintaion);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/profile')
  async updateByIDToken(@Request() req: any, dto: CreateUserDto) {
    const userID = Number(req.user.id);
    return this.userUsecases.update(userID, dto);
  }

  @Get('/top-review/')
  async findTopReview(@Query('amount') amount: number) {
    return this.userUsecases.findTopReviewers(amount);
  }
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  // @Get('profile')
  // @Get('/liked-review/')
  // async findLikedReview(@Request() req: any) {
  //   return this.userUsecases.findTopReviewers(amount);
  // }
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

  // async reportUser() {

  // }
}
