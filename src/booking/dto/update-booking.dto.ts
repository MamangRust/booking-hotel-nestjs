import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdateBookingDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    checkInDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    checkOutDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    amountPaid?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    daysOfStay?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    paidAt?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    room?: number;

}
