import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/models/booking';
import { Room } from 'src/models/room';
import { User } from 'src/models/user';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async create(user_id: number, createBookingDto: CreateBookingDto): Promise<Booking> {
        const { room, ...bookingData } = createBookingDto;

        const room_ = await this.roomRepository.findOne({
            where: {
                id: room
            }
        });
        if (!room_) {
            throw new NotFoundException(`Room with id ${room} not found`);
        }

        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            }
        });
        if (!user) {
            throw new NotFoundException(`User with id ${user_id} not found`);
        }

        const booking = this.bookingRepository.create({
            ...bookingData,
            room: room_,
            user: user,
        });

        return await this.bookingRepository.save(booking);
    }


    async findAll(): Promise<Booking[]> {
        try {
            return await this.bookingRepository.find();
        } catch (error) {
            throw new Error('Failed to fetch bookings');
        }
    }

    async findOne(id: number): Promise<Booking> {
        try {
            const booking = await this.bookingRepository.findOne({
                where: {
                    id
                }
            });
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }
            return booking;
        } catch (error) {
            throw new Error('Failed to find booking');
        }
    }

    async update(user_id: number, id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        const { room, ...bookingData } = updateBookingDto;

        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            }
        });
        if (!user) {
            throw new NotFoundException(`User with id ${user_id} not found`);
        }


        const room_ = await this.roomRepository.findOne({
            where: {
                id: room
            }
        });
        if (!room_) {
            throw new NotFoundException(`Room with id ${room} not found`);
        }

        const booking = await this.bookingRepository.findOne({
            where: {
                id
            }
        });
        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        booking.room = room_;
        booking.user = user;
        booking.checkInDate = bookingData.checkInDate;
        booking.checkOutDate = bookingData.checkOutDate;
        booking.amountPaid = bookingData.amountPaid;
        booking.daysOfStay = bookingData.daysOfStay;
        booking.paidAt = bookingData.paidAt;
        booking.status = "accept";


        return await this.bookingRepository.save(booking);
    }


    async remove(id: number): Promise<void> {
        try {
            const booking = await this.findOne(id);
            await this.bookingRepository.remove(booking);
        } catch (error) {
            throw new Error('Failed to delete booking');
        }
    }
}
