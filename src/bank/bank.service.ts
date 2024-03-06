import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from 'src/models/bank';

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>,
    ) { }

    async findAll(): Promise<Bank[]> {
        return this.bankRepository.find();
    }

    async findOne(id: number): Promise<Bank> {
        const bank = await this.bankRepository.findOne({
            where: {
                id: id
            }
        });
        if (!bank) {
            throw new NotFoundException('Bank not found');
        }
        return bank;
    }

    async create(createBankDto: CreateBankDto): Promise<Bank> {
        try {
            const { name } = createBankDto;
            const existingBank = await this.bankRepository.findOne({ where: { name } });
            if (existingBank) {
                throw new BadRequestException('Bank name already exists');
            }
            return this.bankRepository.save(createBankDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async update(id: number, updateBankDto: UpdateBankDto): Promise<Bank> {
        try {
            const bank = await this.findOne(id);
            return this.bankRepository.save({ ...bank, ...updateBankDto });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const bank = await this.findOne(id);
            await this.bankRepository.remove(bank);
        } catch (error) {
            throw new NotFoundException('Bank not found');
        }
    }
}
