import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultGame } from './entities/result-game.entity';
import { CreateResultGameDto } from './dto/create-result-game.dto';
import { UpdateResultGameDto } from './dto/update-result-game.dto';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ResultGamesService {
  constructor(
    @InjectRepository(ResultGame)
    private readonly resultGameRepository: Repository<ResultGame>,

    @InjectRepository(ScheduledGame)
    private readonly scheduledGameRepository: Repository<ScheduledGame>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createResultGameDto: CreateResultGameDto): Promise<ResultGame> {
    const { scheduledGameId, scoreTeamA, scoreTeamB } = createResultGameDto;

    const scheduledGame = await this.scheduledGameRepository.findOne({
      where: { id: scheduledGameId },
      relations: ['playerA', 'playerB'],
    });

    if (!scheduledGame) {
      throw new NotFoundException('Scheduled game not found');
    }

    let winner: User;
    let loser: User;

    if (scoreTeamA > scoreTeamB) {
      winner = scheduledGame.playerA.user;
      loser = scheduledGame.playerB.user;
    } else if (scoreTeamB > scoreTeamA) {
      winner = scheduledGame.playerB.user;
      loser = scheduledGame.playerA.user;
    } else {
      throw new BadRequestException('Scores cannot be equal');
    }

    const resultGame = this.resultGameRepository.create({
      scheduledGame,
      scoreTeamA,
      scoreTeamB,
      winner,
      loser,
    });

    return await this.resultGameRepository.save(resultGame);
  }

  async findAll(tournamentId?: string): Promise<ResultGame[]> {
    const query = this.resultGameRepository
      .createQueryBuilder('resultGame')
      .leftJoinAndSelect('resultGame.scheduledGame', 'scheduledGame')
      .leftJoinAndSelect('scheduledGame.tournament', 'tournament')
      .leftJoinAndSelect('resultGame.winner', 'winner')
      .leftJoinAndSelect('resultGame.loser', 'loser');

    if (tournamentId) {
      query.where('scheduledGame.tournamentId = :tournamentId', {
        tournamentId,
      });
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<ResultGame> {
    const resultGame = await this.resultGameRepository.findOne({
      where: { id },
      relations: ['scheduledGame', 'winner', 'loser'],
    });

    if (!resultGame) {
      throw new NotFoundException(`ResultGame with ID ${id} not found`);
    }

    return resultGame;
  }

  async update(
    id: string,
    updateResultGameDto: UpdateResultGameDto,
  ): Promise<ResultGame> {
    const resultGame = await this.findOne(id);

    const { scoreTeamA, scoreTeamB } = updateResultGameDto;

    resultGame.scoreTeamA = scoreTeamA;
    resultGame.scoreTeamB = scoreTeamB;

    if (scoreTeamA > scoreTeamB) {
      resultGame.winner = resultGame.scheduledGame.playerA.user;
      resultGame.loser = resultGame.scheduledGame.playerB.user;
    } else if (scoreTeamB > scoreTeamA) {
      resultGame.winner = resultGame.scheduledGame.playerB.user;
      resultGame.loser = resultGame.scheduledGame.playerA.user;
    } else {
      throw new BadRequestException('Scores cannot be equal');
    }

    return await this.resultGameRepository.save(resultGame);
  }
}
