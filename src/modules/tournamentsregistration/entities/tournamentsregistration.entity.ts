import { ScheduledGame } from 'src/modules/scheduled-games/entities/scheduled-game.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tournament_registrations')
export class TournamentsRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tournamentsRegistration, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Tournament,
    (tournament) => tournament.tournamentsRegistration,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({
    type: 'timestamptz',
    name: 'registration_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registrationDate: Date;

  @OneToMany(() => ScheduledGame, (scheduledGame) => scheduledGame.playerA)
  gamesAsPlayerA: ScheduledGame[];

  @OneToMany(() => ScheduledGame, (scheduledGame) => scheduledGame.playerB)
  gamesAsPlayerB: ScheduledGame[];
}
