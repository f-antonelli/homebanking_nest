import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from 'src/account/entities/account.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly trxRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accRepository: Repository<Account>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = createTransactionDto;

      const accountOrigin = await this.accRepository.preload({
        id: transaction.accOrigin,
      });

      const accountDest = await this.accRepository.preload({
        id: transaction.accDestination,
      });

      if (!accountOrigin || !accountDest)
        throw new NotFoundException(`Account with id not found`);

      const trx = this.trxRepository.create({ ...transaction });

      await this.trxRepository.save(trx);

      const newAccAmounts =
        transaction.type === 'EGRESS'
          ? {
              origin: accountOrigin.amount - transaction.amount,
              dest: accountDest.amount + transaction.amount,
            }
          : {
              origin: accountOrigin.amount + transaction.amount,
              dest: accountDest.amount - transaction.amount,
            };

      await this.accRepository.update(transaction.accOrigin, {
        amount: newAccAmounts.origin,
      });

      await this.accRepository.update(transaction.accDestination, {
        amount: newAccAmounts.dest,
      });

      return trx;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.trxRepository.find({
      take: limit,
      skip: offset,
      loadRelationIds: true,
    });
  }

  async findOne(id: string) {
    let trx: Transaction;

    if (isUUID(id)) {
      trx = await this.trxRepository.findOneBy({ id });
    }

    if (!trx) throw new NotFoundException(`Product with id ${id} not found`);

    return trx;
  }

  async remove(id: string) {
    const trx = await this.trxRepository.findOneBy({ id });

    await this.trxRepository.remove(trx);
  }

  async removeAll() {
    const query = this.trxRepository.createQueryBuilder('transaction');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
