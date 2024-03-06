import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from 'src/models/room';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { HotelModule } from 'src/hotel/hotel.module';
import { Hotel } from 'src/models/hotel';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Hotel]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./public/upload/room",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      })
    }),
    HotelModule
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule { }
