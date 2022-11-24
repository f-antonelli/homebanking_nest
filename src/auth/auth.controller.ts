import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, OmitType } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: User,
  })
  @Post('register')
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

  @Get('user')
  @Auth(ValidRoles.user)
  privateRoute(@GetUser() user: User) {
    return { ok: true, user };
  }
}
