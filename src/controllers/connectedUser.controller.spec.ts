import { Test } from '@nestjs/testing';
import { ConnectedUserController } from './connectedUser.controller';
import { CardService, QuizzService } from '../services';
import { CardUserData } from 'types';
import { Card } from '../entities';

describe('ConnectedUserController tests', () => {


    const CATEGORIES = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];
    
    const mapCardCategory = (card:Card) => {
        return {...card, category: CATEGORIES[card.category - 1]};
    }
    
    let controller: ConnectedUserController;
    const cards = [
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf24',
            category: 1,
            question: 'What is the capital of France?',
            answer: 'Paris',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf25',
            category: 1,
            question: 'What is the capital of Spain?',
            answer: 'Madrid',
            tag: 'test2'
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf26',
            category: 2,
            question: 'What is the capital of Germany?',
            answer: 'Berlin',
            tag: 'test'
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf27',
            category: 3,
            question: 'What is the capital of Italy?',
            answer: 'Rome',
            tag: 'test'
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf28',
            category: 2,
            question: 'What is the capital of the United States?',
            answer: 'Washington D.C.',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf29',
            category: 1,
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf30',
            category: 2,
            question: 'What is the capital of Japan?',
            answer: 'Tokyo',
            tag: 'test'
        }
    ]

    const cardsWithTags = (tags: string[]) => cards.filter(card => tags.includes(card.tag));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                ConnectedUserController
            ]
        }).useMocker(token => {
            if(token === CardService) {
                return {
                    getAllCards: jest.fn(() => cards),
                    getTags: jest.fn((tags: string[]) => cards.filter(card => tags.includes(card.tag))),
                    createCard: jest.fn((cardData) => {
                        const newCard = {id: 'a420531b-6123-4b88-a642-2b593fbbaf31', ...cardData, category: 1};
                        cards.push(newCard);
                        return newCard;
                })
                }
            }
            if(token === QuizzService) {
                return {
                    getQuizz: jest.fn(() => cards)
                }
            }
        }).compile();
        
        controller = module.get<ConnectedUserController>(ConnectedUserController);
    })

    it('should return all cards', async () => {
        expect(await controller.getCards()).toEqual(cards.map(mapCardCategory));
    });

    it('should return all cards after adding one', async () => {
        const newCard = {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf31',
            category: 1,
            question: 'What is the capital of Canada?',
            answer: 'Ottawa',
            tag: null
        }
        cards.push(newCard);
        expect(await controller.getCards()).toEqual(cards.map(mapCardCategory));
    });

    it('should return all cards with tag test2', async () => {
        expect(await controller.getCards('test2')).toEqual(cardsWithTags(['test2']).map(mapCardCategory));
    })

    it('should return all cards with tag test and test2', async () => {
        expect(await controller.getCards(['test','test2'])).toEqual(cardsWithTags(['test', 'test2']).map(mapCardCategory));
    })

    it('should create a new card', async () => {
        const newCard:CardUserData = {
            question: 'What is the capital of Canada?',
            answer: 'Ottawa',
            tag: null
        }
        const oldLength = cards.length;
        const createdCard = await controller.createCard(newCard);
        expect(createdCard).toEqual({
            id: expect.any(String),
            ...newCard,
            category: 'FIRST'
        });
        expect(cards).toHaveLength(oldLength + 1);
    });

    it('should return all cards for the quizz', async () => {
        expect(await controller.getQuizz()).toEqual(cards.map(mapCardCategory));
    });

    it('should return all cards for the quizz on a specific date', async () => {
        expect(await controller.getQuizz('2025-01-01')).toEqual(cards.map(mapCardCategory));
    });

});