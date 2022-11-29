import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class LoginUserDto {
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

  @ApiResponseProperty({ example: 'dajklswhedjk231hedlsakjhd' })
  token: string;
}
