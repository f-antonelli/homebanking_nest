import { Account } from "src/account/entities/account.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('card')
export class Card {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    num_card: string;
    
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'int' })
    pin: Number;

    @Column({ type: 'date' })
    expiration_date: Date;

    @OneToOne(() => Account)
    @JoinColumn()
    id_account: Account;

}
