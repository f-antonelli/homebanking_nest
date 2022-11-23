import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, OmitType } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    type: User,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiCreatedResponse({
    type: OmitType(LoginUserDto, ['password']),
  })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
