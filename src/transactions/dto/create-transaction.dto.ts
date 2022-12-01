import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

enum Types {
  EGRESS,
  INCOME,
}

export class CreateTransactionDto {
  @IsEnum(Types)
  type: string;

  @IsString()
  @Length(16, 16)
  card: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsUUID()
  accDestination: string;

  @IsUUID()
  accOrigin: string;
}
