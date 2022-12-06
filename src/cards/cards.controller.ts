import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiCreatedResponse({
    type: Card,
    description: 'Card created succesfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad request',
  })
  @Post()
  @Auth(ValidRoles.user)
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
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
    return this.cardsService.findAll(paginationDto);
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
    return this.cardsService.findOne(uuid);
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
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
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
    return this.cardsService.remove(id);
  }
}
