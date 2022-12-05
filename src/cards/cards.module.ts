import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [TypeOrmModule.forFeature([Card]), CommonModule, AuthModule],
  exports: [TypeOrmModule],
})
export class CardsModule {}
