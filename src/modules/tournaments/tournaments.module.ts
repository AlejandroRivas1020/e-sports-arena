import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tournament,
      TournamentsRegistration,
      ScheduledGame,
    ]),
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
