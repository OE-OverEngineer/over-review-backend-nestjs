import { InjectRepository } from '@nestjs/typeorm';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
} from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Review } from '../entities/review.entity';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Review> {
  constructor(
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
  ) {}
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Review;
  }

  async afterInsert(event: InsertEvent<Review>) {
    const raw = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .addSelect('AVG(reviews.score)', 'score')
      .leftJoin('movie.reviews', 'reviews')
      .where('movie.id = :movieID', { movieID: event.entity.movie.id })
      .groupBy('movie.id')
      .getRawOne();
    console.log(raw);
    // await this.movieEntityRepository.up
    console.log(`AFTER INSERTED: `, event.entity);
  }
}
