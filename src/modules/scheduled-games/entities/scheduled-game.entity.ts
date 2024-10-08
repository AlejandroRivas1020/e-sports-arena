import { ResultGame } from 'src/modules/result-games/entities/result-game.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { TournamentsRegistration } from 'src/modules/tournamentsregistration/entities/tournamentsregistration.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scheduled_games')
export class ScheduledGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.scheduledGames, {
    eager: true,
  })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @ManyToOne(() => TournamentsRegistration, {
    eager: true,
  })
  @JoinColumn({ name: 'player_a' })
  playerA: TournamentsRegistration;

  @ManyToOne(() => TournamentsRegistration, {
    eager: true,
  })
  @JoinColumn({ name: 'player_b' })
  playerB: TournamentsRegistration;

  @Column({ type: 'timestamptz', name: 'game_date' })
  gameDate: Date;

  @OneToOne(() => ResultGame, (resultGame) => resultGame.scheduledGame)
  resultGame: ResultGame;
}
