import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) 
        private readonly accountRepository: Repository<Account>,
    ) {}
    
    async create(createAccountDto: CreateAccountDto) {

        try {
            const account =  this.accountRepository.create(createAccountDto);
            await this.accountRepository.save(account);
            return account;

        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async findAll(paginationDto: PaginationDto){
        
        const { limit = 10, offset = 0 } = paginationDto;
        
        return this.accountRepository.find({
            take: limit,
            skip: offset,
        });

    }

    async findOne( uuid: string){

        let account: Account;

        if(isUUID(uuid)){
            account= await this.accountRepository.findOneBy({
                id: uuid
            });
        } else {
            const queryBuilder = this.accountRepository.createQueryBuilder('account');
            account = await queryBuilder
                .where('account.id = :id',{ uuid })
                .getOne();
        }

        if( !account ) throw new NotFoundException(`Account with ${ uuid } not found`);
    }

    async update( id: string, updateAccountDto: UpdateAccountDto ){
        
        const account = await this.accountRepository.preload({
            id,
            ...updateAccountDto
        });

        if( !account ) throw new NotFoundException(`Account with id: ${ id } not found`);

        try {
            await this.accountRepository.save(account);
            return account;
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async remove( id: string){
        const account = await this.accountRepository.findOneBy({ id });
        await this.accountRepository.remove( account );
    }

    private handleDBErrors(error: any): never {
        console.log(error);
        if (error.code === '23505') throw new BadRequestException(error.detail);
        console.log(error);
        throw new InternalServerErrorException('Please check server logs');
      }
}
