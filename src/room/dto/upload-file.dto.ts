import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UploadImagesDto {
    @ApiProperty({ type: [String], format: 'binary', isArray: true })
    @IsNotEmpty()
    @IsArray()
    images: Express.Multer.File[];
}


