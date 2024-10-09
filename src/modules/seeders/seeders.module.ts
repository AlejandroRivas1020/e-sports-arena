import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSeeder } from './role.seeder';
import { Role } from '../role/entities/role.entity';
import { ResultGame } from '../result-games/entities/result-game.entity';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';
import { User } from '../users/entities/user.entity';
import { UserSeeder } from './user.seeder';
import { TournamentSeeder } from './tournament.seeder';
import { TournamentsRegistrationSeeder } from './tournamentsRegistration.seeder';
import { ScheduledGameSeeder } from './scheduledGames.seeder';
import { ResultGameSeeder } from './resultGames.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      ResultGame,
      ScheduledGame,
      Tournament,
      TournamentsRegistration,
      User,
    ]),
  ],
  providers: [
    RoleSeeder,
    UserSeeder,
    TournamentSeeder,
    TournamentsRegistrationSeeder,
    ScheduledGameSeeder,
    ResultGameSeeder,
  ],
  exports: [
    RoleSeeder,
    UserSeeder,
    TournamentSeeder,
    TournamentsRegistrationSeeder,
    ScheduledGameSeeder,
    ResultGameSeeder,
  ],
})
export class SeedersModule implements OnModuleInit {
  private readonly logger = new Logger(SeedersModule.name);

  constructor(
    private readonly roleSeeder: RoleSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly tournamentSeeder: TournamentSeeder,
    private readonly tournamentsRegistrationSeeder: TournamentsRegistrationSeeder,
    private readonly scheduledGameSeeder: ScheduledGameSeeder,
    private readonly resultGameSeeder: ResultGameSeeder,
  ) {}

  async onModuleInit() {
    this.logger.log('Running seeders...');

    await this.roleSeeder.seed();
    await this.userSeeder.seed();
    await this.tournamentSeeder.seed();
    await this.tournamentsRegistrationSeeder.seed();
    await this.scheduledGameSeeder.seed();
    await this.resultGameSeeder.seed();

    this.logger.log('Seeders completed.');
  }
}
