import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  directorId: number;

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

  @Column()
  requestByUserId: number;

  @Column()
  approve: boolean;
}
