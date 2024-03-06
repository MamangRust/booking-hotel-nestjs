import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../models/review';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Room } from '../models/room';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
    ) { }

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        try {
            const room = await this.roomRepository.findOne({
                where: {
                    id: createReviewDto.roomId
                }
            });
            if (!room) {
                throw new NotFoundException('Room not found');
            }

            const review = this.reviewRepository.create({
                ...createReviewDto,
                room: room,
            });

            return this.reviewRepository.save(review);
        } catch (error) {
            throw new Error('Failed to create review');
        }
    }

    async findAll(): Promise<Review[]> {
        try {
            return this.reviewRepository.find();
        } catch (error) {
            throw new Error('Failed to fetch reviews');
        }
    }

    async findOne(id: number): Promise<Review> {
        try {
            const review = await this.reviewRepository.findOne({
                where: {
                    id
                }
            });
            if (!review) {
                throw new NotFoundException('Review not found');
            }
            return review;
        } catch (error) {
            throw new Error('Failed to find review');
        }
    }

    async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
        try {
            const room = await this.roomRepository.findOne({
                where: {
                    id: updateReviewDto.roomId
                }
            });
            if (!room) {
                throw new NotFoundException('Room not found');
            }

            const review = await this.reviewRepository.findOne({
                where: {
                    id
                }
            });
            if (!review) {
                throw new NotFoundException('Review not found');
            }

            review.room = room

            return this.reviewRepository.save({ ...review, ...updateReviewDto });
        } catch (error) {
            throw new Error('Failed to update review');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const review = await this.reviewRepository.findOne({
                where: {
                    id
                }
            });
            if (!review) {
                throw new NotFoundException('Review not found');
            }

            await this.reviewRepository.remove(review);
        } catch (error) {
            throw new Error('Failed to delete review');
        }
    }
}
