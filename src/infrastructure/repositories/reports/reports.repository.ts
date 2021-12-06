import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IReportRepository } from 'src/domain/repositories/reportRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReportDto } from 'src/infrastructure/dto/reports/createReport.dto';
import { UpdateReportDto } from 'src/infrastructure/dto/reports/updateReport.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';

import { Movie } from 'src/infrastructure/entities/movie.entity';
import { Report } from 'src/infrastructure/entities/report.entity';
import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseReportRepository implements IReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly reportEntityRepository: Repository<Report>,
  ) {}
  // async update(dto: UpdateReportDto, byUserID: number): Promise<Report> {
  //   const report = await this.reportEntityRepository.find()
  // }
  async insert(dto: CreateReportDto, byUserID: number): Promise<Report> {
    const report = this.dtoToReport(dto, byUserID);
    return await this.reportEntityRepository.save(report);
  }
  async findAll(): Promise<Report[]> {
    return await this.reportEntityRepository.find({
      relations: ['targetUser', 'byUser'],
      where: {
        targetUser: {
          banned: false,
        },
      },
    });
  }
  async findAllByID(ids: number[]): Promise<Report[]> {
    return await this.reportEntityRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['targetUser', 'byUser'],
    });
  }
  async findById(id: number): Promise<Report> {
    return await this.reportEntityRepository.findOne(id);
  }
  async deleteById(id: number): Promise<void> {
    await this.reportEntityRepository.delete(id);
  }

  private dtoToReport(dto: CreateReportDto, id: number): Report {
    const byUser: User = new User();
    byUser.id = id;
    const targetUser: User = new User();
    targetUser.id = dto.targetUserID;
    const report: Report = {
      message: dto.message,
      byUser: byUser,
      targetUser: targetUser,
    };
    return report;
  }
}
