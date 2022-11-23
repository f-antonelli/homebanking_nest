import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', unique: true})
  numAccount: string;

  @Column({type: 'double'})
  amount: Number;

  @OneToOne(() => User)
  @JoinColumn()
  userId: User

}