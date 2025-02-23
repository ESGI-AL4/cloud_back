import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category: number;

    @Column()
    question: string;

    @Column()
    answer: string;

    @Column({nullable: true})
    tag: string;
}