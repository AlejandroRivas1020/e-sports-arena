import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTournamentsRegistrationDto } from './dto/update-tournamentsregistration.dto';
import { CreateTournamentsRegistrationDto } from './dto/create-tournamentsregistration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentsRegistration } from './entities/tournamentsregistration.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';

@Injectable()
export class TournamentsregistrationService {
  constructor(
    @InjectRepository(TournamentsRegistration)
    private readonly registrationRepository: Repository<TournamentsRegistration>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(
    createTournamentDto: CreateTournamentsRegistrationDto,
  ): Promise<TournamentsRegistration> {
    const { userId, tournamentId } = createTournamentDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!user || !tournament) {
      throw new Error('User or tournament not found');
    }

    const registration = this.registrationRepository.create({
      user,
      tournament,
    });
    return this.registrationRepository.save(registration);
  }

  async findAll() {
    return this.registrationRepository.find({
      relations: ['user', 'tournament'],
    });
  }

  async findOne(id: string) {
    const registration = await this.registrationRepository.findOne({
      where: { id },
      relations: ['user', 'tournament'],
    });
    if (!registration) {
      throw new NotFoundException('inscription not found');
    }

    return registration;
  }

  async update(
    id: string,
    updateTournamentsregistrationDto: UpdateTournamentsRegistrationDto,
  ) {
    const { userId, tournamentId } = updateTournamentsregistrationDto;
    const registration = await this.findOne(id);

    if (userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      registration.user = user;
    }

    if (tournamentId) {
      const tournament = await this.tournamentRepository.findOne({
        where: { id: tournamentId },
      });
      if (!tournament) {
        throw new NotFoundException('tournament not found');
      }
      registration.tournament = tournament;
    }

    return this.registrationRepository.save(registration);
  }

  async calculateScores(
    tournamentId: string,
  ): Promise<TournamentsRegistration[]> {
    const registrations = await this.registrationRepository.find({
      where: { tournament: { id: tournamentId } },
      relations: ['resultGamesWon', 'resultGamesLost'],
    });

    const results = registrations.map((registration) => {
      const gamesWon = registration.resultGamesWon.length;

      const gamesLost = registration.resultGamesLost.length;

      const totalPoints = gamesWon * 3;

      return {
        ...registration,
        gamesWon,
        gamesLost,
        totalPoints,
      };
    });

    for (const result of results) {
      await this.registrationRepository.update(result.id, {
        gamesWon: result.gamesWon,
        gamesLost: result.gamesLost,
        totalPoints: result.totalPoints,
      });
    }

    return results;
  }
}
