import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../tournaments/entities/tournament.entity';

@Injectable()
export class TournamentSeeder {
  private readonly logger = new Logger(TournamentSeeder.name);

  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async seed() {
    const tournaments = [
      {
        name: 'Spring Championship',
        description: 'The ultimate tournament to crown the champion of spring.',
        startDate: new Date('2024-03-01T10:00:00Z'),
        endDate: new Date('2024-03-31T18:00:00Z'),
        numberPlayers: 16,
        registeredPlayers: 0,
      },
      {
        name: 'Summer Showdown',
        description: 'A heated tournament to determine the summer champion.',
        startDate: new Date('2024-06-01T10:00:00Z'),
        endDate: new Date('2024-06-30T18:00:00Z'),
        numberPlayers: 32,
        registeredPlayers: 0,
      },
      {
        name: 'Autumn Clash',
        description: 'The clash of titans in the autumn season.',
        startDate: new Date('2024-09-01T10:00:00Z'),
        endDate: new Date('2024-09-30T18:00:00Z'),
        numberPlayers: 16,
        registeredPlayers: 0,
      },
      {
        name: 'Winter Cup',
        description: 'Fight for glory in the winter cup.',
        startDate: new Date('2024-12-01T10:00:00Z'),
        endDate: new Date('2024-12-31T18:00:00Z'),
        numberPlayers: 8,
        registeredPlayers: 0,
      },
      {
        name: 'Grand Tournament',
        description: 'The grand tournament where legends are made.',
        startDate: new Date('2025-01-01T10:00:00Z'),
        endDate: new Date('2025-01-31T18:00:00Z'),
        numberPlayers: 64,
        registeredPlayers: 0,
      },
    ];

    for (const tournament of tournaments) {
      const existingTournament = await this.tournamentRepository.findOne({
        where: { name: tournament.name },
      });

      if (!existingTournament) {
        const newTournament = this.tournamentRepository.create(tournament);
        await this.tournamentRepository.save(newTournament);
        this.logger.log(`Tournament '${tournament.name}' has been added.`);
      } else {
        this.logger.log(`Tournament '${tournament.name}' already exists.`);
      }
    }
  }
}
