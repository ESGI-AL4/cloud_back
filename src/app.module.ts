import { Module } from '@nestjs/common';
import {ConnectedUserController, HealthController} from './controllers';
import { CardService, QuizzService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card, Quizz } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([Quizz]),
  ],
  controllers: [ConnectedUserController, HealthController],
  providers: [CardService, QuizzService],
})
export class AppModule {}
