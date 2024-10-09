import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';

@Injectable()
export class ScheduledGameSeeder {
  private readonly logger = new Logger(ScheduledGameSeeder.name);

  constructor(
    @InjectRepository(ScheduledGame)
    private scheduledGameRepository: Repository<ScheduledGame>,

    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    @InjectRepository(TournamentsRegistration)
    private tournamentsRegistrationRepository: Repository<TournamentsRegistration>,
  ) {}

  async seed() {
    const tournaments = await this.tournamentRepository.find();

    for (const tournament of tournaments) {
      const registrations = await this.tournamentsRegistrationRepository.find({
        where: { tournament: { id: tournament.id } },
        relations: ['user'],
      });

      if (registrations.length < 2) {
        this.logger.warn(
          `Not enough players registered for tournament '${tournament.name}'.`,
        );
        continue;
      }

      const matches = this.createAllMatches(
        registrations,
        tournament.startDate,
        tournament.endDate,
      );

      for (const match of matches) {
        const scheduledGame = this.scheduledGameRepository.create({
          tournament: { id: tournament.id } as Tournament,
          playerA: { id: match.playerA.id } as TournamentsRegistration,
          playerB: { id: match.playerB.id } as TournamentsRegistration,
          gameDate: match.gameDate,
        });

        await this.scheduledGameRepository.save(scheduledGame);

        if (match.playerA.user && match.playerB.user) {
          this.logger.log(
            `Scheduled game between '${match.playerA.user.name}' and '${match.playerB.user.name}' for tournament '${tournament.name}'.`,
          );
        } else {
          this.logger.warn(
            `User data missing for one of the players in the scheduled game for tournament '${tournament.name}'.`,
          );
        }
      }
    }
  }

  private createAllMatches(
    registrations: TournamentsRegistration[],
    startDate: Date,
    endDate: Date,
  ): {
    playerA: TournamentsRegistration;
    playerB: TournamentsRegistration;
    gameDate: Date;
  }[] {
    const matches: {
      playerA: TournamentsRegistration;
      playerB: TournamentsRegistration;
      gameDate: Date;
    }[] = [];

    for (let i = 0; i < registrations.length; i++) {
      for (let j = i + 1; j < registrations.length; j++) {
        const playerA = registrations[i];
        const playerB = registrations[j];

        const gameDate = this.getRandomGameDate(startDate, endDate);

        matches.push({ playerA, playerB, gameDate });
      }
    }
    return matches;
  }

  private getRandomGameDate(startDate: Date, endDate: Date): Date {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const randomTimestamp =
      Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
      startTimestamp;

    return new Date(randomTimestamp);
  }
}
