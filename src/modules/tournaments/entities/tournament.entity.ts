import { ScheduledGame } from 'src/modules/scheduled-games/entities/scheduled-game.entity';
import { TournamentsRegistration } from 'src/modules/tournamentsregistration/entities/tournamentsregistration.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'timestamptz', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamptz', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'int', name: 'number_players' })
  numberPlayers: number;

  @Column({ type: 'int', name: 'registered_players', default: 0 })
  registeredPlayers: number;

  @OneToMany(
    () => TournamentsRegistration,
    (registration) => registration.tournament,
  )
  tournamentsRegistration: TournamentsRegistration[];

  @OneToMany(() => ScheduledGame, (scheduledGame) => scheduledGame.tournament)
  scheduledGames: ScheduledGame[];
}
