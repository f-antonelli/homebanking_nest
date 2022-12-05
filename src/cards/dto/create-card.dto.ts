import { IsDate, IsString } from 'class-validator';
import { Account } from 'src/account/entities/account.entity';

export class CreateCardDto {
  @IsString()
  num_card: string;

  @IsString()
  name: string;

  @IsDate()
  expiration_date: Date;

  @IsString()
  accountId: Account;
}
