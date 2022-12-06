import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card')
export class Card {
  @ApiProperty({
    example: 'UUID: 50fbcf31-ea7e-432a-9a62-de3851d5e4a0',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '4242 4242 4242 4242',
  })
  @Column({ type: 'text', unique: true })
  num_card: string;

  @ApiProperty({
    example: 'Anakin Skywalker',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: '1234',
  })
  @Column({ type: 'int' })
  pin: number;

  @ApiProperty({
    example: '2022-03-25',
  })
  @Column({ type: 'date' })
  expiration_date: Date;

  @ApiProperty({
    example: 'account.id',
  })
  @OneToOne(() => Account)
  @JoinColumn()
  accountId: Account;
}
