import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.comments)
  user: User;

  @ManyToOne(() => Review, (r) => r.comments)
  review: Review;

  @Column()
  message: string;

  // @ManyToOne(() => Movie, (m) => m.i)
  // movie: Movie;
}
