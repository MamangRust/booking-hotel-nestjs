import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    bankId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    userId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    bookingId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    taxRate?: number;
}