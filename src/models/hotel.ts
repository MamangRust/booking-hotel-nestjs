import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from './room';

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    address: string;

    @Column()
    description: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @OneToMany(() => Room, room => room.hotel)
    rooms: Room[];
}
