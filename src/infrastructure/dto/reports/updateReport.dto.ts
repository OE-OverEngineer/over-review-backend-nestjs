import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './createReport.dto';

export class UpdateReviewDto extends PartialType(CreateReportDto) {}
