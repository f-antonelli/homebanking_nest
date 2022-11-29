import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  numOperation: string;

  @IsString()
  @IsIn(['EGRESS', 'INCOME'])
  type: string;

  @IsString()
  card: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  accDestination: string;

  @IsNumber()
  @IsPositive()
  accOrigin: string;
}
