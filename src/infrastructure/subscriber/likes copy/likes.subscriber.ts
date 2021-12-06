import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/infrastructure/entities/like.entity';

import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
} from 'typeorm';
import { Review } from '../../entities/review.entity';

@EventSubscriber()
export class LikesSubscriber implements EntitySubscriberInterface<Like> {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Review)
    private readonly reviewEntityRepository: Repository<Review>,
    @InjectRepository(Like)
    private readonly likeEntityRepository: Repository<Like>,
  ) {
    connection.subscribers.push(this);
  }
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Like;
  }

  async afterInsert(event: InsertEvent<Like>) {
    const { likes } = await this.likeEntityRepository
      .createQueryBuilder('like')
      .select('COUNT(*)', 'likes')
      .where('like.review.id = :reviewID', { reviewID: event.entity.review.id })
      .groupBy('like.review.id')
      .getRawOne();
    await this.reviewEntityRepository.update(event.entity.review.id, {
      likesCount: likes,
    });

    console.log(`AFTER INSERTED: `, event.entity);
  }
}
