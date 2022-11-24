import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';

import { AccountModule } from './account/account.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AsdModule } from './asd/asd.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    AccountModule,
    TransactionsModule,
    AsdModule,
  ],
})
export class AppModule {}
