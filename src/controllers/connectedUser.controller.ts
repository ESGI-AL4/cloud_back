import {Controller, Get, Post, Query, Body, Patch, Param, HttpCode} from '@nestjs/common';
import { CardService, QuizzService } from '../services';
import { Card } from '../entities';
import {CardUserData, CardDTO, AnswerDTO } from 'src/types';

const CATEGORIES = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];

const mapCardCategory = (card:Card) => {
    return {...card, category: CATEGORIES[card.category - 1]};
}
@Controller('cards')
export class ConnectedUserController {
    constructor(
        private readonly cardService: CardService,
        private readonly quizzService: QuizzService
    ) {}

    @Get()
    async getCards(@Query('tags') tags?:string | string[]): Promise<CardDTO[]> {
        console.log(tags);
        let cards: Card[];
        if(tags) {
            if(typeof tags === 'string') {
                tags = [tags];
            }
            cards = await this.cardService.getTags(tags);
        } else {
            cards = await this.cardService.getAllCards();
        }
        return cards.map(mapCardCategory);
    }

    @Post()
    @HttpCode(201)
    async createCard(@Body() cardData: CardUserData): Promise<CardDTO> {
        const card = await this.cardService.createCard(cardData);
        return mapCardCategory(card);
    }

    @Get('/quizz')
    async getQuizz(@Query('date') date?: string) {
        let quizzDate: Date;
        if(date) {
            quizzDate = new Date(date);
        } else {
            quizzDate = new Date();
        }
        const quizz = await this.quizzService.getQuizz(quizzDate);

        return quizz.map(mapCardCategory);
    }

    @Patch('/:id/answer')
    @HttpCode(204)
    async answerCard(@Param('id') id: string, @Body() answer: AnswerDTO) {
        await this.quizzService.answerQuestion(id, answer.isValid);
    }
}
