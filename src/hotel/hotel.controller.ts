import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/models/hotel';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Hotel')
@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new hotel' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Hotel created', type: Hotel })
    async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
        return await this.hotelService.createHotel(createHotelDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all hotels' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of all hotels', type: [Hotel] })
    async findAll(): Promise<Hotel[]> {
        return await this.hotelService.findAllHotels();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a hotel by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Hotel found', type: Hotel })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found' })
    async findOne(@Param('id') id: number): Promise<Hotel> {
        return await this.hotelService.findHotelById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a hotel' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Hotel updated', type: Hotel })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found' })
    async update(@Param('id') id: number, @Body() updateHotelDto: UpdateHotelDto): Promise<Hotel> {
        return await this.hotelService.updateHotel(id, updateHotelDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a hotel' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Hotel deleted' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found' })
    async remove(@Param('id') id: number): Promise<void> {
        await this.hotelService.deleteHotel(id);
    }
}
