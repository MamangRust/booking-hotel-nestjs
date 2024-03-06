import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PaymentMethod } from 'src/models/payment_method';
import { PaymentService } from './payment.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method';
import { UpdatePaymentMethodDto } from './dto/update-payment-method';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Get()
    @ApiOperation({ summary: 'Get all payment methods' })
    @ApiResponse({ status: 200, description: 'Return all payment methods', type: [PaymentMethod] })
    async findAll(): Promise<PaymentMethod[]> {
        return this.paymentService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a payment method by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Payment method ID' })
    @ApiResponse({ status: 200, description: 'Return a payment method by ID', type: PaymentMethod })
    @ApiResponse({ status: 404, description: 'Payment method not found' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PaymentMethod> {
        const paymentMethod = await this.paymentService.findOne(id);
        return paymentMethod;
    }

    @Post()
    @ApiOperation({ summary: 'Create a payment method' })
    @ApiBody({ type: CreatePaymentMethodDto })
    @ApiResponse({ status: 201, description: 'Payment method created', type: PaymentMethod })
    async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        return this.paymentService.create(createPaymentMethodDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a payment method by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Payment method ID' })
    @ApiBody({ type: UpdatePaymentMethodDto })
    @ApiResponse({ status: 200, description: 'Payment method updated', type: PaymentMethod })
    @ApiResponse({ status: 404, description: 'Payment method not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
    ): Promise<PaymentMethod> {
        return this.paymentService.update(id, updatePaymentMethodDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a payment method by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Payment method ID' })
    @ApiResponse({ status: 204, description: 'Payment method deleted' })
    @ApiResponse({ status: 404, description: 'Payment method not found' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.paymentService.remove(id);
    }
}
