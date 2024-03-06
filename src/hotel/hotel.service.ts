import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/models/hotel';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ) { }

    async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        try {
            const hotel = this.hotelRepository.create({
                name: createHotelDto.name,
                address: createHotelDto.address,
                description: createHotelDto.description,
                phoneNumber: createHotelDto.phoneNumber,
                email: createHotelDto.email
            });

            await this.hotelRepository.save(hotel);

            return hotel
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAllHotels(): Promise<Hotel[]> {
        try {
            return await this.hotelRepository.find({
                relations: ['room']
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findHotelById(id: number): Promise<Hotel> {
        try {
            const hotel = await this.hotelRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!hotel) {
                throw new NotFoundException('Hotel not found');
            }
            return hotel;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateHotel(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
        try {
            const hotel = await this.findHotelById(id);

            this.hotelRepository.merge(hotel, updateHotelDto);
            return await this.hotelRepository.save(hotel);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteHotel(id: number): Promise<void> {
        try {
            const hotel = await this.findHotelById(id);
            await this.hotelRepository.remove(hotel);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
