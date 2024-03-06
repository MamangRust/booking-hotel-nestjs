import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Room } from './room';
import { User } from './user';
import { Transaction } from './transaction';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    checkInDate: Date;

    @Column({ type: 'timestamp' })
    checkOutDate: Date;

    @Column()
    amountPaid: number;

    @Column()
    daysOfStay: number;

    @Column({ type: 'timestamp' })
    paidAt: Date;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Room, room => room.bookings)
    room: Room;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @OneToMany(() => Transaction, transaction => transaction.booking) // Relasi dengan Transaction
    transactions: Transaction[];
}
