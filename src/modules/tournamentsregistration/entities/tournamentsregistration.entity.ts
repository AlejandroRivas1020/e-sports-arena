import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
}
