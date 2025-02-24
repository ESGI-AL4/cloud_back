import { Module } from '@nestjs/common';
import {AuthController, ConnectedUserController, HealthController} from './controllers';
import { CardService, QuizzService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card, Quizz } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([Quizz]),
  ],
  controllers: [ConnectedUserController, HealthController, AuthController],
  providers: [CardService, QuizzService],
})
export class AppModule {}