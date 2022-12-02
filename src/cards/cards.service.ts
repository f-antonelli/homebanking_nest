import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ){}

  async create(createCardDto: CreateCardDto) {
    try {
      const card = this.cardRepository.create({
        ...createCardDto,
      });
      await this.cardRepository.save(card);
      return card;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    
    return  this.cardRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(uuid: string) {
    let card: Card;

    if(isUUID(uuid)){
      card = await this.cardRepository.findOneBy({
        id: uuid,
      });
      return card;
    } else {
      const queryBuilder = this.cardRepository.createQueryBuilder('card');
      card = await queryBuilder.where('card.id = :id', { uuid }).getOne();
    }
    if(!card) throw new NotFoundException(`Card with ${uuid} not found`);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepository.preload({
      id,
      ...updateCardDto,
    });

    if(!card){
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    try {
      await this.cardRepository.save(card);
      return card;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const card = await this.cardRepository.findOneBy({ id });
    await this.cardRepository.remove(card);
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
