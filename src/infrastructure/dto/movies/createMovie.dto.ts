import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsDateString,
} from 'class-validator';
import { IsActorListFound } from 'src/infrastructure/validators/actors/actors.validator';
import { IsCategoryListFound } from 'src/infrastructure/validators/categories/category.validator';
import { IsDirectorFound } from 'src/infrastructure/validators/directors/director.validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsInt()
  @IsDirectorFound()
  @ApiProperty()
  directorID: number;

  @IsNotEmpty()
  @IsInt({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsActorListFound()
  @ApiProperty({ type: [Number] })
  actorsID: number[];

  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ type: [Number] })
  @IsCategoryListFound()
  categoriesID: number[];

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bannerImage: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  trailerLink: string;
}