import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { Review } from './models/review';
import { Room } from './models/room';
import { UserModule } from './user/user.module';
import { Bank } from './models/bank';
import { PaymentMethod } from './models/payment_method';
import { Transaction } from './models/transaction';
import { Booking } from './models/booking';
import { Hotel } from './models/hotel';
import { BankModule } from './bank/bank.module';
import { PaymentModule } from './payment/payment.module';
import { HotelModule } from './hotel/hotel.module';
import { RoomModule } from './room/room.module';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ReviewModule } from './review/review.module';
import { BookingModule } from './booking/booking.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'public',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Review, Room, Bank, PaymentMethod, Transaction, Booking, Hotel],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    BankModule,
    PaymentModule,
    HotelModule,
    RoomModule,
    ReviewModule,
    BookingModule,
    TransactionModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
