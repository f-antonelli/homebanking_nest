import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Account } from 'src/account/entities/account.entity';

export class CreateCardDto {
  @ApiProperty({
    example: '4242 4242 4242 4242',
  })
  @IsString()
  num_card: string;

  @ApiProperty({
    example: 'Anakin Skywalker',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1234',
  })
  pin: number;

  @ApiProperty({
    example: '2022-03-25',
  })
  @IsDate()
  expiration_date: Date;

   @ApiProperty({
    example: 'account.id',
  })
  @IsString()
  accountId: Account;
}
