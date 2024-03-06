import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roomId: number;

    @ApiProperty({ required: false })
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating?: number;

    @ApiProperty({ required: false })
    @IsString()
    comment?: string;
}
