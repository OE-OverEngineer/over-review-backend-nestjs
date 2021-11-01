import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => User, (u) => u.reviews)
  user: User;

  @Column()
  message: string;

  @Column({ type: 'tinyint' })
  score: number;

  @ManyToOne(() => Movie, (m) => m.id)
  movie: Movie;

  @OneToMany(() => Comment, (c) => c.review)
  comments: Comment[];
}
