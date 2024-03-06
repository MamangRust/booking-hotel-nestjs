import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/models/hotel';
import { Room } from 'src/models/room';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Room])],
  controllers: [HotelController],
  providers: [HotelService]
})
export class HotelModule { }
