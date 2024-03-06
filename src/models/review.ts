import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Room } from './room';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne((type) => User, (user) => user.reviews)
  user: User;

  @ManyToOne((type) => Room, (room) => room.reviews)
  room: Room;
}
