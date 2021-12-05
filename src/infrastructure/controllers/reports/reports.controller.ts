import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateReportDto } from 'src/infrastructure/dto/reports/createReport.dto';

import { ReportsUsecase } from 'src/usecases/reports/reports.usecase';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportUseCases: ReportsUsecase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateReportDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.reportUseCases.create(dto, userID);
  }

  @Get()
  findAll() {
    return this.reportUseCases.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reportUseCases.findOne(id);
  }
  //   @Post('/like')
  //   async like(@Body() dto: CreateLikeDto) {
  //     const userID = 1;
  //     return this.likesUsecases.like(dto, userID);
  //   }
}
