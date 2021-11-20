// import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Review, (r) => r.likes)
  review: Review;

  @ManyToOne(() => User, (u) => u.likes)
  byUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
