import { Module } from '@nestjs/common';
import { ScheduledGamesService } from './scheduled-games.service';
import { ScheduledGamesController } from './scheduled-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledGame } from './entities/scheduled-game.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { ResultGame } from '../result-games/entities/result-game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduledGame,
      TournamentsRegistration,
      Tournament,
      ResultGame,
    ]),
  ],
  controllers: [ScheduledGamesController],
  providers: [ScheduledGamesService],
})
export class ScheduledGamesModule {}
