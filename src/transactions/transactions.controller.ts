import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { Auth } from 'src/auth/decorators';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiBody({
    type: CreateTransactionDto,
  })
  @ApiCreatedResponse({
    type: OmitType(CreateTransactionDto, ['accDestination', 'accOrigin']),
  })
  @Post()
  @Auth(ValidRoles.user)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @ApiCreatedResponse({
    type: [CreateTransactionDto],
  })
  @Get()
  @Auth(ValidRoles.user)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.transactionsService.findAll(paginationDto);
  }

  @ApiCreatedResponse({
    type: CreateTransactionDto,
  })
  @Get(':id')
  @Auth(ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.transactionsService.findOne(id);
  }

  @ApiResponse({ description: 'Transaction id has been deleted' })
  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.transactionsService.remove(id);
  }

  @ApiResponse({ description: 'All transactions have been deleted' })
  @Delete()
  @Auth(ValidRoles.user)
  removeAll() {
    return this.transactionsService.removeAll();
  }
}
