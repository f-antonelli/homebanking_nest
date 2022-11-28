import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  numOperation: string;

  @IsString()
  @IsIn(['visa', 'master'])
  type: string;

  @IsString()
  card: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  accDestination: number;

  @IsNumber()
  @IsPositive()
  accOrigin: number;
}
