import { InjectRepository } from '@nestjs/typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  AfterInsert,
  Repository,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  // constructor(
  //   @InjectRepository(Movie)
  //   private readonly movieEntityRepository: Repository<Movie>,
  // ) {}
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (u) => u.reviews)
  user: User;

  @Column()
  message: string;

  @Column({ type: 'integer' })
  score: number;

  @ManyToOne(() => Movie, (m) => m.reviews)
  movie: Movie;

  @OneToMany(() => Comment, (c) => c.review)
  comments?: Comment[];

  @OneToMany(() => Like, (c) => c.review)
  likes?: Like[];

  likesCount?: number;

  // @AfterInsert()
  // private async computeAverage(): Promise<void> {
  //   console.log('hello');
  // }
}
