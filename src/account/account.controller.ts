import { Body, Controller, Get, Post, Query, Param, Patch, ParseUUIDPipe, Delete } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Post('account')
    createAccount(@Body() createAccountDto: CreateAccountDto) {
      return this.accountService.create(createAccountDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto){
      return this.accountService.findAll(paginationDto);
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string){
      return this.accountService.findOne(uuid);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string,
           @Body() updateAccountDto: UpdateAccountDto ){
      return this.accountService.update(id, updateAccountDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string){
      return this.accountService.remove(id);
    }
}
