import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultGame } from '../result-games/entities/result-game.entity';
import { ScheduledGame } from '../scheduled-games/entities/scheduled-game.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity'; // Asegúrate de que esta ruta sea correcta

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
      const winner = await this.getRandomWinner(game.playerA, game.playerB);
      const loser = winner === game.playerA ? game.playerB : game.playerA;

      const winnerUser = winner.user;
      const loserUser = loser.user;

      if (winnerUser && loserUser) {
        const scoreTeamA = this.getRandomScore();
        const scoreTeamB = this.getRandomScore();

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

  private async getRandomWinner(
    playerA: TournamentsRegistration,
    playerB: TournamentsRegistration,
  ) {
    return Math.random() < 0.5 ? playerA : playerB;
  }

  private getRandomScore() {
    return Math.floor(Math.random() * 10);
  }
}
