import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;

  @ApiProperty()
  directorID: number;

  @ApiProperty({ type: [Number] })
  actorsID: number[];

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  bannerImage: string;

  @ApiProperty()
  trailerLink: string;

  @ApiProperty()
  requestByUserID?: string;
}
