import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateReportDto } from 'src/infrastructure/dto/reports/createReport.dto';

import { ReportsUsecase } from 'src/usecases/reports/reports.usecase';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportUseCases: ReportsUsecase) {}
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Post()
  create(@Body() dto: CreateReportDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.reportUseCases.create(dto, userID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.reportUseCases.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reportUseCases.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.reportUseCases.delete(id);
  }
  //   @Post('/like')
  //   async like(@Body() dto: CreateLikeDto) {
  //     const userID = 1;
  //     return this.likesUsecases.like(dto, userID);
  //   }
}
