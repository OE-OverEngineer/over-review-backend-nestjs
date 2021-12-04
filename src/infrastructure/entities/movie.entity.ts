import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './actor.entity';
import { Category } from './category.entity';
import { Director } from './director.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Director, (d) => d.movies)
  director: Director;

  @ManyToMany(() => Actor, (a) => a.movies)
  @JoinTable()
  actors: Actor[];

  @ManyToMany(() => Category, (a) => a.movies)
  @JoinTable()
  categories: Category[];

  @Column()
  startDate: Date;

  @Column()
  bannerImageUrl: string;

  @Column()
  trailerLinkUrl: string;

  @Column()
  approve: boolean;

  @ManyToOne(() => User, (u) => u.movieRequest, { nullable: true })
  requestByUser?: User;

  @OneToMany(() => Review, (r) => r.movie, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reviews?: Review[];

  @Column({ type: 'float', default: 0 })
  score?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
