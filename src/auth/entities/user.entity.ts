import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '50fbcf31-ea7e-432a-9a62-de3851d5e4a0',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'neymar@gmail.com',
  })
  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @ApiProperty({ example: 'Neymar' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 'Junior' })
  @Column({ type: 'text' })
  lastname: string;

  @ApiProperty({ example: ['user'] })
  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
