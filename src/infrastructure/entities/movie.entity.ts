import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Actor } from './actor.entity';
import { Director } from './director.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Director, (d) => d.movies)
  director: Director;

  @ManyToMany(() => Actor, (a) => a.movies)
  actors: Actor[];

  @Column()
  startDate: Date;

  @Column()
  bannerImage: string;

  @Column()
  trailerLink: string;

  @ManyToOne(() => User, (u) => u.movieRequest, { nullable: true })
  requestByUser?: User;

  @Column()
  approve?: boolean;

  @OneToMany(() => Review, (r) => r.movie)
  reviews?: Review[];
}
