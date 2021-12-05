import { InjectRepository } from '@nestjs/typeorm';
import { raw } from 'express';
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
    console.log('3');

    const movie = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.reviews', 'reviews')
      .where('movie.id = :movieID', { movieID })
      .getOne();
    console.log(movie);

    const reviewData = movie.reviews;
    console.log(reviewData);
    let total = 0;
    reviewData.forEach((e) => (total += e.score));
    total = total / reviewData.length;
    reviewData.push(event.entity);
    console.log(reviewData);

    total = 0;
    reviewData.forEach((e) => (total += e.score));
    total = total / reviewData.length;
    console.log(total);
    await this.movieEntityRepository.update(movieID, {
      score: total,
    });

    console.log(`AFTER INSERTED: `, event.entity);
  }
}
