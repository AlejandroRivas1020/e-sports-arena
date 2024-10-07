import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    const savedTournament = await this.tournamentRepository.save(tournament);
    return savedTournament;
  }

  async findAll() {
    return this.tournamentRepository.find();
  }

  async findOne(id: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament is not found');
    }

    return tournament;
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto) {
    const tournament = await this.tournamentRepository.preload({
      id: id,
      ...updateTournamentDto,
    });
    if (!tournament) {
      throw new NotFoundException('Tournament is not found');
    }
  }
}
