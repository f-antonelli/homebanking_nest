import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

enum Types {
  EGRESS,
  INCOME,
}

export class CreateTransactionDto {
  @IsEnum(Types)
  type: string;

  @IsString()
  card: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  accDestination: string;

  @IsString()
  accOrigin: string;
}
