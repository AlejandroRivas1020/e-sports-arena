import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduledGameDto } from './dto/create-scheduled-game.dto';
import { UpdateScheduledGameDto } from './dto/update-scheduled-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledGame } from './entities/scheduled-game.entity';
import { Repository } from 'typeorm';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';

@Injectable()
export class ScheduledGamesService {
  constructor(
    @InjectRepository(ScheduledGame)
    private readonly scheduledGameRepository: Repository<ScheduledGame>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(TournamentsRegistration)
    private readonly registrationRepository: Repository<TournamentsRegistration>,
  ) {}

  async create(
    createScheduledGameDto: CreateScheduledGameDto,
  ): Promise<ScheduledGame> {
    const { tournamentId, playerAId, playerBId, gameDate } =
      createScheduledGameDto;

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    const playerA = await this.registrationRepository.findOne({
      where: { id: playerAId },
    });

    if (!playerA) {
      throw new NotFoundException('Player A not found');
    }

    const playerB = await this.registrationRepository.findOne({
      where: { id: playerBId },
    });
    if (!playerB) {
      throw new NotFoundException('Player B not found');
    }

    const scheduledGame = this.scheduledGameRepository.create({
      tournament,
      playerA,
      playerB,
      gameDate,
    });

    return await this.scheduledGameRepository.save(scheduledGame);
  }

  async findAll(): Promise<ScheduledGame[]> {
    return await this.scheduledGameRepository.find({
      relations: ['tournament', 'playerA', 'playerB'],
    });
  }

  async findOne(id: string): Promise<ScheduledGame> {
    const scheduledGame = await this.scheduledGameRepository.findOne({
      where: { id },
      relations: ['tournament', 'playerA', 'playerB'],
    });

    if (!scheduledGame) {
      throw new NotFoundException(`Scheduled game with ID ${id} not found`);
    }

    return scheduledGame;
  }

  async update(
    id: string,
    updateScheduledGameDto: UpdateScheduledGameDto,
  ): Promise<ScheduledGame> {
    const { tournamentId, playerAId, playerBId, gameDate } =
      updateScheduledGameDto;

    const scheduledGame = await this.scheduledGameRepository.findOne({
      where: { id },
    });

    if (!scheduledGame) {
      throw new NotFoundException(`Scheduled game with ID ${id} not found`);
    }

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    const playerA = await this.registrationRepository.findOne({
      where: { id: playerAId },
    });
    if (!playerA) {
      throw new NotFoundException('Player A not found');
    }

    const playerB = await this.registrationRepository.findOne({
      where: { id: playerBId },
    });
    if (!playerB) {
      throw new NotFoundException('Player B not found');
    }

    scheduledGame.tournament = tournament;
    scheduledGame.playerA = playerA;
    scheduledGame.playerB = playerB;
    scheduledGame.gameDate = gameDate;

    return await this.scheduledGameRepository.save(scheduledGame);
  }
}
