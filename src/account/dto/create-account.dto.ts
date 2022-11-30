import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateAccountDto {

  @ApiProperty({
    example: '3450204958690'
  })
  @IsString()
  numAccount: string;

  @ApiProperty({
    example: '123456'
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'UUID: 16763be4-6022-406e-a950-fcd5018633ca'
  })
  @IsString()
  userId: User;
}
