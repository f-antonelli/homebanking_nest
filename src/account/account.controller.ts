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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiCreatedResponse({
    type: Account,
    description: 'Account created succesfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad request',
  })
  @Post('')
  @Auth(ValidRoles.user)
  createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @GetUser() user: User,
  ) {
    return this.accountService.create(createAccountDto, user);
  }

  @ApiOkResponse({
    description: 'The resources were returned succesfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accountService.findAll(paginationDto);
  }

  @ApiOkResponse({
    description: 'The resources were returned succesfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @Get(':uuid')
  @Auth(ValidRoles.user)
  findOne(@Param('uuid') uuid: string) {
    return this.accountService.findOne(uuid);
  }

  @ApiOkResponse({
    description: 'The resources was updated succesfully',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad request',
  })
  @Patch(':id')
  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(id, updateAccountDto);
  }

  @ApiOkResponse({
    description: 'The resource was deleted succesfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountService.remove(id);
  }
}
