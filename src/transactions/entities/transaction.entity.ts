import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Types } from '../dto/create-transaction.dto';

@Entity('transactions')
export class Transaction {
  @ApiProperty({
    example: '50fbcf31-ea7e-432a-9a62-de3851d5e4a0',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: Types })
  @Column({ type: 'text' })
  type: string;

  @ApiProperty({ example: '4859607938' })
  @Column({ type: 'text' })
  card: string;

  @ApiProperty({ example: 1231254 })
  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => Account, (account) => account.id)
  accDestination: string;

  @ManyToOne(() => Account, (account) => account.id)
  accOrigin: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.type = this.type.toLocaleUpperCase().trim();
  }
}
