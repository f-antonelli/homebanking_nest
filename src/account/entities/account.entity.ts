import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('account')
export class Account {
  @ApiProperty({
    example: 'UUID: 50fbcf31-ea7e-432a-9a62-de3851d5e4a0',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '3450204958690',
  })
  @Column({ type: 'text', unique: true })
  numAccount: string;

  @ApiProperty({
    example: '123456',
  })
  @Column({ type: 'int' })
  amount: number;

  @ApiProperty({
    example: 'user.id',
  })
  @OneToOne(() => User)
  @JoinColumn()
  userId: User;
}
