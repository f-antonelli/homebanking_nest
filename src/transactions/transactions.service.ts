import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from 'src/account/entities/account.entity';
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
      const { ...transaction } = createTransactionDto;

      const accountOrigin = await this.accRepository.preload({
        id: transaction.accOrigin,
      });

      const accountDest = await this.accRepository.preload({
        id: transaction.accDestination,
      });

      if (!accountOrigin || !accountDest)
        throw new NotFoundException(
          `Account with id: ${accountOrigin.id || accountDest.id} not found`,
        );

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

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
