import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    bankId: number;

    @ApiProperty({ description: 'ID of the payment method', example: 1 })
    @IsNotEmpty({ message: 'Payment method ID must not be empty' })
    @IsInt({ message: 'Payment method ID must be an integer' })
    paymentMethodId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    bookingId: number;

}