import { Account } from 'src/account/entities/account.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  numOperation: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  card: string;

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
