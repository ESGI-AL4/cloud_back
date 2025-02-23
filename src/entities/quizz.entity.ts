import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Quizz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    date: Date;
}