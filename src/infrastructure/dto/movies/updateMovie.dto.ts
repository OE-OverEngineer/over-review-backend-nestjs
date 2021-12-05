import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsDateString,
} from 'class-validator';
import { IsActorListFound } from 'src/infrastructure/validators/actors/actors.validator';
import { IsCategoryListFound } from 'src/infrastructure/validators/categories/category.validator';
import { IsDirectorFound } from 'src/infrastructure/validators/directors/director.validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
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
  trailerLinkUrl: string;
}
// export class UpdateMovieDto extends OmitType(CreateMovieDto, []) {}
