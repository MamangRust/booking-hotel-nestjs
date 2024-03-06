import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Review } from '../models/review';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Review')
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new reviews' })
    @ApiResponse({ status: 201, description: 'The review has been successfully created.', type: Review })
    @ApiBadRequestResponse({ description: 'Invalid request payload' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return await this.reviewService.create(createReviewDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all reviews' })
    @ApiResponse({ status: 200, description: 'Returns all reviews.', type: [Review] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async findAll(): Promise<Review[]> {
        return await this.reviewService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a review by id' })
    @ApiParam({ name: 'id', description: 'Review ID' })
    @ApiResponse({ status: 200, description: 'Returns a review by id.', type: Review })
    @ApiNotFoundResponse({ description: 'Review not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
        const review = await this.reviewService.findOne(id);

        return review;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update review by id' })
    @ApiParam({ name: 'id', description: 'Review ID' })
    @ApiResponse({ status: 200, description: 'The review has been successfully updated.', type: Review })
    @ApiNotFoundResponse({ description: 'Review not found' })
    @ApiBadRequestResponse({ description: 'Invalid request payload' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
        return await this.reviewService.update(id, updateReviewDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete review by id' })
    @ApiParam({ name: 'id', description: 'Review ID' })
    @ApiResponse({ status: 200, description: 'The review has been successfully deleted.' })
    @ApiNotFoundResponse({ description: 'Review not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.reviewService.remove(id);
    }
}
