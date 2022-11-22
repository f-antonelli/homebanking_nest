import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      console.log(typeof +this.configService.get<number>('SALT'));
      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(
          password,
          +this.configService.get<number>('SALT'),
        ),
      });

      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
