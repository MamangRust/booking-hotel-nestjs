import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review';
import { User } from './user';
import { Booking } from './booking';
import { Hotel } from './hotel';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column()
  pricePerNight: number;

  @Column()
  address: string;

  @Column()
  numOfBeds: number;

  @Column({ default: false })
  internet: boolean;

  @Column({ default: false })
  petsAllowed: boolean;

  @Column({ default: 0 })
  ratings: number;

  @Column({ default: 0 })
  numOfReviews: number;

  @Column({
    type: 'enum',
    enum: ['King', 'Single', 'Twins'],
  })
  category: string;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  @OneToMany((type) => Review, (review) => review.room)
  reviews: Review[];

  @ManyToOne((type) => User, (user) => user.rooms)
  user: User;

  @OneToMany(() => Booking, booking => booking.room)
  bookings: Booking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
