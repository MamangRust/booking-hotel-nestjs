import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from 'src/models/bank';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Bank')
@Controller('bank')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    @Get()
    @ApiOperation({ summary: 'Get all banks' })
    @ApiResponse({ status: 200, description: 'Returns all banks', type: [Bank] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async findAll(): Promise<Bank[]> {
        return this.bankService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a bank by ID' })
    @ApiResponse({ status: 200, description: 'Returns a bank by id', type: Bank })
    @ApiNotFoundResponse({ description: 'Bank not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async findOne(@Param('id') id: number): Promise<Bank> {
        return this.bankService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new bank' })
    @ApiResponse({ status: 201, description: 'Creates a new bank', type: Bank })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async create(@Body() createBankDto: CreateBankDto): Promise<Bank> {
        return this.bankService.create(createBankDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a bank by ID' })
    @ApiResponse({ status: 200, description: 'Updates a bank by id', type: Bank })
    @ApiNotFoundResponse({ description: 'Bank not found' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async update(@Param('id') id: number, @Body() updateBankDto: UpdateBankDto): Promise<Bank> {
        return this.bankService.update(id, updateBankDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a bank by ID' })
    @ApiOkResponse({ description: 'Bank deleted successfully' })
    @ApiNotFoundResponse({ description: 'Bank not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.bankService.remove(id);
    }
}
