import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
} from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { Review } from '../../entities/review.entity';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Review> {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
    @InjectRepository(Review)
    private readonly reviewEntityRepository: Repository<Review>,
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
    const movieID = event.entity.movie.id;
    const sql = await this.reviewEntityRepository
      .createQueryBuilder('review')
      // .select('id')
      .select('AVG(score)', 'scores')
      .where('review.movie.id = :movieID', { movieID: movieID })
      .groupBy('review.movie.id')
      .getSql();
    const result = await this.reviewEntityRepository
      .createQueryBuilder('review')
      // .select('id')
      // .addSelect('score')
      .select('AVG(score)', 'scores')
      .where('review.movie.id = :movieID', { movieID: movieID })
      .groupBy('review.movie.id')
      .getRawOne();
    console.log(sql);
    console.log(result);
    // await this.movieEntityRepository.update(event.entity.movie.id, {
    //   score: result.scores,
    // });

    console.log(`AFTER INSERTED: `, event.entity);
  }
}
