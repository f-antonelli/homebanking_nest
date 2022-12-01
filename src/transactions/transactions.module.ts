import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AccountModule } from 'src/account/account.module';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forFeature([Transaction, Account]),
    AuthModule,
    AccountModule,
    CommonModule,
  ],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}
