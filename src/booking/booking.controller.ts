import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiCreatedResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/models/booking';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiCreatedResponse({ description: 'Booking has been successfully created.' })
    @ApiBadRequestResponse({ description: 'Invalid request payload.' })
    async create(@Req() req, @Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingService.create(req.user.id, createBookingDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: 200, description: 'List of all bookings.', type: [Booking] })
    async findAll(): Promise<Booking[]> {
        return this.bookingService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a booking by ID' })
    @ApiOkResponse({ description: 'Booking found.', type: Booking })
    @ApiNotFoundResponse({ description: 'Booking not found.' })
    async findOne(@Param('id') id: number): Promise<Booking> {
        return this.bookingService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a booking by ID' })
    @ApiOkResponse({ description: 'Booking has been successfully updated.' })
    @ApiNotFoundResponse({ description: 'Booking not found.' })
    @ApiBadRequestResponse({ description: 'Invalid request payload.' })
    async update(@Req() req, @Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
        return this.bookingService.update(req.user.id, id, updateBookingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a booking by ID' })
    @ApiOkResponse({ description: 'Booking has been successfully deleted.' })
    @ApiNotFoundResponse({ description: 'Booking not found.' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.bookingService.remove(id);
    }
}
