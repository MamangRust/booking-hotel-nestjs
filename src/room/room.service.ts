import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from 'src/models/hotel';
import { Room } from 'src/models/room';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
        @InjectRepository(Room) private roomRepository: Repository<Room>
    ) { }

    async create(createRoomDto: CreateRoomDto, images: Express.Multer.File[]): Promise<Room> {
        try {
            const { hotelId, ...roomData } = createRoomDto;

            const hotel = await this.hotelRepository.findOne({
                where: {
                    id: hotelId
                }
            });
            if (!hotel) {
                throw new NotFoundException('Hotel not found');
            }

            const room = this.roomRepository.create({
                name: roomData.name,
                description: roomData.description,
                pricePerNight: roomData.pricePerNight,
                address: roomData.address,
                numOfBeds: roomData.numOfBeds,
                internet: roomData.internet,
                petsAllowed: roomData.petsAllowed,
                category: roomData.category,
                images: images.map(file => file.filename)
            });
            room.hotel = hotel;

            return this.roomRepository.save(room);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findAll(): Promise<Room[]> {
        try {
            return this.roomRepository.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findOne(id: number): Promise<Room> {
        try {
            const room = await this.roomRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!room) {
                throw new NotFoundException('Room not found');
            }
            return room;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id: number, updateRoomDto: UpdateRoomDto, images: Express.Multer.File[]): Promise<Room> {
        try {
            const room = await this.roomRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!room) {
                throw new NotFoundException('Room not found');
            }

            const { hotelId, ...roomData } = updateRoomDto;
            if (hotelId) {

                const hotel = await this.hotelRepository.findOne({
                    where: {
                        id: hotelId
                    }
                });
                if (!hotel) {
                    throw new NotFoundException('Hotel not found');
                }
                room.hotel = hotel;
            }

            room.name = roomData.name;
            room.description = roomData.description;
            room.pricePerNight = roomData.pricePerNight;
            room.address = roomData.address;
            room.numOfBeds = roomData.numOfBeds;
            room.internet = roomData.internet;
            room.petsAllowed = roomData.petsAllowed;
            room.category = roomData.category;

            if (images && images.length > 0) {
                room.images = images.map(file => file.filename);
            }

            return this.roomRepository.save(room);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const room = await this.roomRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!room) {
                throw new NotFoundException('Room not found');
            }
            await this.roomRepository.remove(room);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
