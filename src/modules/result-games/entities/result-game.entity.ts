import { ScheduledGame } from 'src/modules/scheduled-games/entities/scheduled-game.entity';
import { TournamentsRegistration } from 'src/modules/tournamentsregistration/entities/tournamentsregistration.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('result_games')
export class ResultGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ScheduledGame,
    (scheduledGame) => scheduledGame.resultGames,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'scheduled_game_id' })
  scheduledGame: ScheduledGame;

  @Column({ type: 'int' })
  scoreTeamA: number;

  @Column({ type: 'int' })
  scoreTeamB: number;

  @ManyToOne(() => TournamentsRegistration, { eager: true })
  @JoinColumn({ name: 'winner_id' })
  winner: TournamentsRegistration;

  @ManyToOne(() => TournamentsRegistration, { eager: true })
  @JoinColumn({ name: 'loser_id' })
  loser: TournamentsRegistration;
}
