import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomCategory } from '../enum/roomCategory';
import { UploadImagesDto } from './upload-file.dto';


export class UpdateRoomDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    hotelId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: true, type: 'string', format: 'binary', description: 'Image file for the room' })
    @IsNotEmpty()
    @IsArray()
    images: Express.Multer.File[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    pricePerNight?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    numOfBeds?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    internet?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    petsAllowed?: boolean;

    @ApiProperty({ enum: RoomCategory, enumName: 'RoomCategory', required: false })
    @IsOptional()
    @IsEnum(RoomCategory)
    category?: RoomCategory;
}
