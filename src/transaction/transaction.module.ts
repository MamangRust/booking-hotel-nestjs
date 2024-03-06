import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction';
import { User } from 'src/models/user';
import { Bank } from 'src/models/bank';
import { PaymentMethod } from 'src/models/payment_method';
import { Booking } from 'src/models/booking';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User, Bank, PaymentMethod, Booking])
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule { }
