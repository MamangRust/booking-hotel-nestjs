import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/models/bank';
import { PaymentMethod } from 'src/models/payment_method';
import { Repository, In } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method';
import { UpdatePaymentMethodDto } from './dto/update-payment-method';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentMethod)
        private readonly paymentMethodRepository: Repository<PaymentMethod>,
        @InjectRepository(Bank)
        private readonly bankRepository: Repository<Bank>,
    ) { }

    async getPaymentMethods(): Promise<PaymentMethod[]> {
        try {
            return await this.paymentMethodRepository.find({
                relations: ['banks']
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(): Promise<PaymentMethod[]> {
        try {
            return await this.paymentMethodRepository.createQueryBuilder('pm')
                .leftJoinAndSelect('pm.banks', 'bank')
                .getMany();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: number): Promise<PaymentMethod> {
        try {
            const paymentMethod = await this.paymentMethodRepository.findOne({
                where: { id },
                relations: ['banks'],
            });
            if (!paymentMethod) {
                throw new NotFoundException('Payment method not found');
            }
            return paymentMethod;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        try {
            const banks = await this.bankRepository.find({
                where: { id: In(createPaymentMethodDto.bankIds) }
            });
            if (!banks || banks.length === 0) {
                throw new NotFoundException('Banks not found');
            }
            const paymentMethod = this.paymentMethodRepository.create({
                name: createPaymentMethodDto.name,
                banks,
            });
            return await this.paymentMethodRepository.save(paymentMethod);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
        try {
            const paymentMethod = await this.findOne(id);
            const banks = await this.bankRepository.find({
                where: { id: In(updatePaymentMethodDto.bankIds) }
            });
            paymentMethod.name = updatePaymentMethodDto.name;
            paymentMethod.banks = banks;
            return await this.paymentMethodRepository.save(paymentMethod);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const paymentMethod = await this.findOne(id);
            await this.paymentMethodRepository.remove(paymentMethod);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
