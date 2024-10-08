import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { UsersModule } from './modules/users/users.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TournamentsregistrationModule } from './modules/tournamentsregistration/tournamentsregistration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    TournamentsModule,
    TournamentsregistrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
