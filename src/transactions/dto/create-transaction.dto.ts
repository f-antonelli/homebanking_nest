import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export enum Types {
  EGRESS,
  INCOME,
}

export class CreateTransactionDto {
  @ApiProperty({ enum: Types })
  @IsEnum(Types)
  type: string;

  @ApiProperty({ example: '4859607938' })
  @IsString()
  @Length(16, 16)
  card: string;

  @ApiProperty({ example: 1231254 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    example: '50fbcf31-ea7e-432a-9a62-de3851d5e4a0',
  })
  @IsUUID()
  accDestination: string;

  @ApiProperty({
    example: '50fbcf31-ea7e-432a-9a62-de3851d5e4a0',
  })
  @IsUUID()
  accOrigin: string;
}
