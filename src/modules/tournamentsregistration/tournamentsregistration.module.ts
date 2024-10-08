import { Module } from '@nestjs/common';
import { TournamentsregistrationService } from './tournamentsregistration.service';
import { TournamentsregistrationController } from './tournamentsregistration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { User } from '../users/entities/user.entity';
import { TournamentsRegistration } from './entities/tournamentsregistration.entity';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tournament,
      TournamentsRegistration,
      User,
      ScheduledGame,
    ]),
  ],
  controllers: [TournamentsregistrationController],
  providers: [TournamentsregistrationService],
})
export class TournamentsregistrationModule {}
