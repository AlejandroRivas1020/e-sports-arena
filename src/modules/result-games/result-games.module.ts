import { Module } from '@nestjs/common';
import { ResultGamesService } from './result-games.service';
import { ResultGamesController } from './result-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultGame } from './entities/result-game.entity';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultGame, ScheduledGame, User])],
  controllers: [ResultGamesController],
  providers: [ResultGamesService],
})
export class ResultGamesModule {}
