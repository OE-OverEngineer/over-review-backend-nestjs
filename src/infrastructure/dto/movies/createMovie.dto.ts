import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsFQDN,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
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
  @ArrayMinSize(1)
  @ApiProperty({ type: [Number] })
  actorsID: number[];

  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
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
