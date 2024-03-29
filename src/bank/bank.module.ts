import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/models/bank';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank])
  ],
  providers: [BankService],
  controllers: [BankController]
})
export class BankModule { }
