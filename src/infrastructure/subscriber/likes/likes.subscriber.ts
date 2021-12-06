import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/infrastructure/entities/like.entity';

import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
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
    const count = await this.likeEntityRepository.count({
      where: {
        review: {
          id: event.entity.review.id,
        },
      },
    });
    await this.reviewEntityRepository.update(event.entity.review.id, {
      likesCount: count + 1,
    });

    console.log(`AFTER INSERTED: `, event.entity);
  }

  async afterRemove(event: RemoveEvent<Like>) {
    const count = await this.likeEntityRepository.count({
      where: {
        review: {
          id: event.entity.review.id,
        },
      },
    });
    await this.reviewEntityRepository.update(event.entity.review.id, {
      likesCount: count - 1,
    });

    console.log(`AFTER REMOVED: `, event.entity);
  }
}
