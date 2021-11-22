import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
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
    private readonly connection: Connection,
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
  ) {
    connection.subscribers.push(this);
  }
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Review;
  }

  async afterInsert(event: InsertEvent<Review>) {
    const { score } = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('AVG(reviews.score)', 'score')
      .leftJoin('movie.reviews', 'reviews')
      .where('movie.id = :movieID', { movieID: event.entity.movie.id })
      .groupBy('movie.id')
      .getRawOne();
    await this.movieEntityRepository.update(event.entity.id, {
      score,
    });

    console.log(`AFTER INSERTED: `, event.entity);
  }
}
