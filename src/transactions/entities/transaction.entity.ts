import { Account } from 'src/account/entities/account.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  numOperation: string;

  @Column({ type: 'string' })
  type: string;

  @Column({ type: 'string' })
  card: string;

  @Column({ type: 'number' })
  amount: number;

  @Column({ type: 'number' })
  accDestination: number;

  @ManyToOne(() => Account, (account) => account.numAccount)
  accOrigin: number;
}
