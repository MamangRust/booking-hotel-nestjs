import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/models/booking';
import { Room } from 'src/models/room';
import { User } from 'src/models/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Room, User])
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule { }
