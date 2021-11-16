import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsIn,
  IsString,
  IsDate,
  IsFQDN,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsAlpha,
  IsArray,
} from 'class-validator';
export class CreateMovieDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsInt()
  @ApiProperty()
  directorID: number;

  @IsNotEmpty()
  @IsInt({ each: true })
  @IsArray()
  @ApiProperty({ type: [Number] })
  actorsID: number[];

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({ type: [Number] })
  categoriesID: number[];

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsFQDN()
  @ApiProperty()
  bannerImage: string;

  @IsFQDN()
  @ApiProperty()
  trailerLink: string;

  @IsInt()
  @ApiProperty()
  requestByUserID?: string;
}
