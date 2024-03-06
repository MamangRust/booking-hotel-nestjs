import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Bank } from "./bank";
import { User } from "./user";
import { Booking } from "./booking";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bank, bank => bank.transactions)
    bank: Bank;

    @ManyToOne(() => User, user => user.transactions)
    user: User;

    @ManyToOne(() => Booking, booking => booking.transactions)
    booking: Booking;

    @Column()
    paymentMethod: string;

    @Column({ default: 'paying' })
    status: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    taxRate: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
