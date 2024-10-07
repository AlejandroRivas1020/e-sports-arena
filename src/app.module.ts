import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { UsersModule } from './modules/users/users.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, TournamentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
