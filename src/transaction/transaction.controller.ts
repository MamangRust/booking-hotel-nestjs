import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiForbiddenResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Transaction } from 'src/models/transaction';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get a transaction by ID' })
    @ApiResponse({ status: 200, description: 'Transaction found', type: Transaction })
    @ApiNotFoundResponse({ description: 'Transaction not found' })
    async findTransaction(@Req() req, @Param('id') id: number): Promise<Transaction> {
        return await this.transactionService.findTransaction(req.user.id, id);
    }

    @UseGuards(UseGuards)
    @Put(':id/confirm-payment')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Transaction ID' })
    @ApiResponse({ status: 200, description: 'Payment confirmed' })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    @ApiResponse({ status: 403, description: 'Payment already confirmed' })
    async confirmPayment(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.transactionService.confirmPayment(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new transaction' })
    @ApiResponse({ status: 201, description: 'Transaction created', type: Transaction })
    @ApiBadRequestResponse({ description: 'Invalid transaction data' })
    async createTransaction(@Req() req, @Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return await this.transactionService.create(req.user.id, createTransactionDto);
    }

    @Put(':id/accept')
    @ApiOperation({ summary: 'Accept a transaction' })
    @ApiResponse({ status: 200, description: 'Transaction accepted' })
    @ApiNotFoundResponse({ description: 'Transaction not found or cannot be accepted' })
    async acceptTransaction(@Param('id') id: number): Promise<void> {
        await this.transactionService.acceptTransaction(id);
    }

    @Put(':id/reject')
    @ApiOperation({ summary: 'Reject a transaction' })
    @ApiResponse({ status: 200, description: 'Transaction rejected' })
    @ApiNotFoundResponse({ description: 'Transaction not found or cannot be rejected' })
    async rejectTransaction(@Param('id') id: number): Promise<void> {
        await this.transactionService.rejectTransaction(id);
    }
}
