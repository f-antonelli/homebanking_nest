import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('')
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.cardsService.findAll(paginationDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.cardsService.findOne(uuid);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.remove(id);
  }
}
