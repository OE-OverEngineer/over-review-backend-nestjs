import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from 'src/infrastructure/dto/reports/createReport.dto';

import { ReportsUsecase } from 'src/usecases/reports/reports.usecase';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportUseCases: ReportsUsecase) {}
  @Post()
  create(@Body() dto: CreateReportDto) {
    const id = 1;
    return this.reportUseCases.create(dto, id);
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
