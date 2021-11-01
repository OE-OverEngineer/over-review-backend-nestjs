export class MovieModel {
  id: number;
  directorId: number;
  title: string;
  description: string;
  startDate: Date;
  bannerImage: string;
  trailerLink: string;
  requestByUserId: number;
  approve: boolean;
}
