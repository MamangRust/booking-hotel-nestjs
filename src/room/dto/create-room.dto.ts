import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomCategory } from '../enum/roomCategory';

export class CreateRoomDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    hotelId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ required: true, type: 'string', format: 'binary', description: 'Image file for the room' })
    @IsNotEmpty()
    @IsArray()
    images: Express.Multer.File[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    pricePerNight: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    numOfBeds: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    internet?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    petsAllowed?: boolean;

    @ApiProperty({ enum: RoomCategory, enumName: 'RoomCategory' })
    @IsNotEmpty()
    @IsEnum(RoomCategory)
    category: RoomCategory;
}
