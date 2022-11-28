import { IsString, IsNumber  } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateAccountDto {

    @IsString()
    numAccount: string;

    @IsNumber()
    amount: Number;

    @IsString()
    userId: User;
}