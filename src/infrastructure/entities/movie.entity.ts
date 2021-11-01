import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Actor } from './actor.entity';
import { Director } from './director.entity';
import { User } from './user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => Director, (d) => d.movies)
  director: Director;

  @ManyToMany(() => Actor, (a) => a.movies)
  actors: Actor[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  bannerImage: string;

  @Column()
  trailerLink: string;

  @ManyToOne(() => User, (u) => u.movieRequest)
  requestByUser: User;

  @Column()
  approve: boolean;
}
