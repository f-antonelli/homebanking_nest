import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'neymar@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'arg1234567',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: 'Neymar',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    example: 'Junior',
  })
  @ApiProperty()
  @IsString()
  @MinLength(1)
  lastname: string;
}
