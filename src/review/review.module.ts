import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/models/review';
import { Room } from 'src/models/room';
import { User } from 'src/models/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Room, User])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule { }
