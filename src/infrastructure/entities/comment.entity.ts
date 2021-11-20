import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reply } from './reply.entity';
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

  @OneToMany(() => Reply, (r) => r.comment)
  reply: Reply[];
  // @ManyToOne(() => Movie, (m) => m.i)
  // movie: Movie;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
