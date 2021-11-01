import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Director {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Movie, (m) => m.director)
  movies: Movie[];
}
