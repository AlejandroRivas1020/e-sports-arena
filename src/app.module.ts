import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { UsersModule } from './modules/users/users.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TournamentsregistrationModule } from './modules/tournamentsregistration/tournamentsregistration.module';
import { ScheduledGamesModule } from './modules/scheduled-games/scheduled-games.module';
import { ResultGamesModule } from './modules/result-games/result-games.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    TournamentsModule,
    TournamentsregistrationModule,
    ScheduledGamesModule,
    ResultGamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
