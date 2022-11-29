import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Patch,
  ParseUUIDPipe,
  Delete,
  Req,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators';

import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('')
  @Auth(ValidRoles.user)
  createAccount(@Body() createAccountDto: CreateAccountDto, @Req() request) {
    return this.accountService.create(createAccountDto, request.user);
  }

  @Get()
  @Auth(ValidRoles.user)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accountService.findAll(paginationDto);
  }

  @Get(':uuid')
  @Auth(ValidRoles.user)
  findOne(@Param('uuid') uuid: string) {
    return this.accountService.findOne(uuid);
  }

  @Patch(':id')
  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountService.remove(id);
  }
}
