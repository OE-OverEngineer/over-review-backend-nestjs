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
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/dto/users/createUser.dto';
import { UsersUseCases } from 'src/usecases/users/users.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { LikesUseCases } from 'src/usecases/likes/likes.usecase';
import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';
import { UpdateProfileDto } from 'src/infrastructure/dto/users/updateProfile.dto';
// import { UpdateUserDto } from 'src/infrastructure/dto/users/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userUsecases: UsersUseCases,
    private readonly reviewsUsecases: ReviewsUseCases,
    private readonly likeUsecases: LikesUseCases,
  ) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Member)
  @ApiUnauthorizedResponse({
    description: 'Member missing or wrong jwt',
  })
  @ApiOkResponse({
    description: 'Get current member profile',
  })
  @Get('profile')
  async me(@Request() req) {
    console.log(req);
    const user = await this.userUsecases.findOne(req.user.id);
    return user;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @ApiUnauthorizedResponse({
    description: 'Member missing or wrong jwt',
  })
  @ApiOkResponse({
    description: 'Update profile success',
  })
  @ApiBadRequestResponse({
    description: 'Data is incorrect format',
  })
  @Patch('/profile')
  async updateByIdToken(@Request() req: any, @Body() dto: UpdateProfileDto) {
    const userId = Number(req.user.id);
    return this.userUsecases.update(userId, dto);
  }

  @Get('/:id/reviews')
  async findReviewFromID(
    @Query() pagintaion: Pagination,
    @Param('id') id: number,
  ) {
    return this.reviewsUsecases.findAllByUserID(id, pagintaion);
  }

  @Get('/top-review/')
  async findTopReview(@Query('amount') amount: number) {
    return this.userUsecases.findTopReviewers(amount);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/:id/banuser')
  async banUser(@Param('id') id: string) {
    const userId = Number(id);
    return this.userUsecases.banUser(userId, true);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/:id/unbanuser')
  async unbanUser(@Param('id') id: string) {
    const userId = Number(id);
    return this.userUsecases.banUser(userId, false);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(Role.Member)
  @Get('/liked-review/')
  async findLikedReview(@Request() req: any) {
    const userID = Number(req.user.id);
    return this.likeUsecases.findLikeByUserID(userID);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    const userId = Number(id);
    return this.userUsecases.delete(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.userUsecases.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userUsecases.create(createUserDto);
  }

  @Get('/:id')
  viewProfile(@Param('id') id: number) {
    const userId = Number(id);
    return this.userUsecases.findOne(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Patch('/:id')
  async updateUser(@Request() req: any, @Body() dto: UpdateUserDto) {
    const userId = Number(req.user.id);
    return this.userUsecases.update(userId, dto);
  }
}
