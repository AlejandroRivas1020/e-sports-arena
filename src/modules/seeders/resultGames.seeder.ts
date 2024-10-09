import { InjectRepository } from '@nestjs/typeorm';
import { ResultGame } from '../result-games/entities/result-game.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';
import { Repository } from 'typeorm';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ResultGameSeeder {
  private readonly logger = new Logger(ResultGameSeeder.name);

  constructor(
    @InjectRepository(ResultGame)
    private resultGameRepository: Repository<ResultGame>,

    @InjectRepository(ScheduledGame)
    private scheduledGameRepository: Repository<ScheduledGame>,

    @InjectRepository(TournamentsRegistration)
    private tournamentsRegistrationRepository: Repository<TournamentsRegistration>,
  ) {}

  async seed() {
    const scheduledGames = await this.scheduledGameRepository.find({
      relations: ['playerA', 'playerB'],
    });

    for (const game of scheduledGames) {
      const { scoreTeamA, scoreTeamB } = this.generateScores();

      let winner, loser;
      if (scoreTeamA > scoreTeamB) {
        winner = game.playerA;
        loser = game.playerB;
      } else {
        winner = game.playerB;
        loser = game.playerA;
      }

      const winnerUser = winner.user;
      const loserUser = loser.user;

      if (winnerUser && loserUser) {
        const resultGame = this.resultGameRepository.create({
          scheduledGame: game,
          winner,
          loser,
          scoreTeamA,
          scoreTeamB,
        });

        await this.resultGameRepository.save(resultGame);

        this.logger.log(
          `Recorded result for game: ${game.id}, Winner: ${winnerUser.name}, Loser: ${loserUser.name}, Score: ${scoreTeamA}-${scoreTeamB}`,
        );
      } else {
        this.logger.warn(
          `User data missing for winner or loser in game ID: ${game.id}. Winner ID: ${winner?.id}, Loser ID: ${loser?.id}`,
        );
      }
    }
  }

  private generateScores() {
    const scoreTeamA = Math.floor(Math.random() * 10);
    let scoreTeamB = Math.floor(Math.random() * 10);

    while (scoreTeamA === scoreTeamB) {
      scoreTeamB = Math.floor(Math.random() * 10);
    }

    return { scoreTeamA, scoreTeamB };
  }
}
