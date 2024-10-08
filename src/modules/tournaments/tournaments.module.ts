import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentsRegistration])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
