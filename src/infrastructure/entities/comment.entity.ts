import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => User, (u) => u.comments)
  user: User;

  @ManyToOne(() => Review, (r) => r.comments)
  review: Review;

  @Column()
  message: string;

  @Column({ type: 'tinyint' })
  score: number;

  @ManyToOne(() => Movie, (m) => m.id)
  movie: Movie;
}