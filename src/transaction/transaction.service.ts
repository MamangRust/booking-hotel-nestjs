import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/models/bank';
import { PaymentMethod } from 'src/models/payment_method';
import { Transaction } from 'src/models/transaction';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/models/user';
import { Booking } from 'src/models/booking';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Bank) private bankRepository: Repository<Bank>,
        @InjectRepository(PaymentMethod) private paymentMethodRepository: Repository<PaymentMethod>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>
    ) { }


    async findTransaction(id: number, user_id: number): Promise<Transaction> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: {
                    id,
                    user: {
                        id: user_id
                    }
                },
                relations: ['booking']
            })

            return transaction
        } catch (error) {
            throw new NotFoundException('Transaction not found')
        }
    }

    async create(user_id: number, create: CreateTransactionDto): Promise<Transaction> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: user_id
                }
            })

            if (!user) {
                throw new NotFoundException('User not found');
            }

            const bank = await this.bankRepository.findOne({
                where: {
                    id: create.bankId
                }
            })

            if (!bank) {
                throw new NotFoundException('Bank not found');
            }

            const paymentMethod = await this.paymentMethodRepository.findOne({
                where: {
                    id: create.paymentMethodId
                }
            })

            if (!paymentMethod) {
                throw new NotFoundException('Payment method not found');
            }

            const booking = await this.bookingRepository.findOne({
                where: {
                    id: create.bookingId
                }
            })

            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            const transaction = this.transactionRepository.create({
                user: user,
                bank: bank,
                booking: booking,
                paymentMethod: paymentMethod.name,
                taxRate: 10 / 10
            })

            booking.status = "accept";

            await this.bookingRepository.save(booking);

            await this.transactionRepository.save(transaction)

            return transaction;

        } catch (error) {
            throw new NotFoundException(`Failed to create transaction: ${error.message}`);
        }
    }

    async confirmPayment(id: number): Promise<{ message: string }> {
        try {
            const transaction = await this.transactionRepository.findOneOrFail({
                where: {
                    id: id
                }
            });

            if (transaction.status !== 'paying') {
                throw new ForbiddenException('Unable to confirm this payment. Payment for this transaction has already been confirmed.');
            }

            transaction.status = 'verifying';
            await this.transactionRepository.save(transaction);

            return { message: 'Payment has been confirmed. Please wait for admin verification.' };
        } catch (error) {
            throw new NotFoundException('Transaction not found');
        }
    }

    async acceptTransaction(id: number): Promise<void> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { id, status: 'verifying' },
            });

            if (!transaction) {
                throw new NotFoundException('Transaction not found or cannot be accepted');
            }

            transaction.status = 'accepted';

            await this.transactionRepository.save(transaction);
        } catch (error) {
            throw new Error(`Failed to accept transaction: ${error.message}`);
        }
    }

    async rejectTransaction(id: number): Promise<void> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { id, status: 'verifying' },
            });

            if (!transaction) {
                throw new NotFoundException('Transaction not found or cannot be rejected');
            }

            transaction.status = 'rejected';

            await this.transactionRepository.save(transaction);
        } catch (error) {
            throw new Error(`Failed to reject transaction: ${error.message}`);
        }
    }

}
