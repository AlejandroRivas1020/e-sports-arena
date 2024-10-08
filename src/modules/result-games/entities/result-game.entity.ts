import { ScheduledGame } from 'src/modules/scheduled-games/entities/scheduled-game.entity';
import { User } from 'src/modules/users/entities/user.entity';
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

  @ManyToOne(() => ScheduledGame, (scheduledGame) => scheduledGame.id, {
    eager: true,
  })
  @JoinColumn({ name: 'scheduled_game_id' })
  scheduledGame: ScheduledGame;

  @Column({ type: 'int' })
  scoreTeamA: number;

  @Column({ type: 'int' })
  scoreTeamB: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'winner_id' })
  winner: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'loser_id' })
  loser: User;
}
