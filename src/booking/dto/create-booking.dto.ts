import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    checkInDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    checkOutDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amountPaid: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    daysOfStay: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    paidAt: Date;

    @ApiProperty()
    @IsNotEmpty()
    room: number;

}
