import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/infrastructure/entities/comment.entity';
import { Like } from 'src/infrastructure/entities/like.entity';

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
export class CommentsSubscriber implements EntitySubscriberInterface<Comment> {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Review)
    private readonly reviewEntityRepository: Repository<Review>,
    @InjectRepository(Comment)
    private readonly commentEntityRepository: Repository<Comment>,
  ) {
    connection.subscribers.push(this);
  }
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Comment;
  }

  async afterInsert(event: InsertEvent<Comment>) {
    const count = await this.commentEntityRepository.count({
      where: {
        review: {
          id: event.entity.review.id,
        },
      },
    });
    console.log(count);

    await this.reviewEntityRepository.update(event.entity.review.id, {
      commentsCount: count + 1,
    });

    console.log(`AFTER INSERTED: `, event.entity);
  }
}
