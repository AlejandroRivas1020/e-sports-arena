import { Module } from '@nestjs/common';
import { TournamentsregistrationService } from './tournamentsregistration.service';
import { TournamentsregistrationController } from './tournamentsregistration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { User } from '../users/entities/user.entity';
import { TournamentsRegistration } from './entities/tournamentsregistration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, TournamentsRegistration, User]),
  ],
  controllers: [TournamentsregistrationController],
  providers: [TournamentsregistrationService],
})
export class TournamentsregistrationModule {}
