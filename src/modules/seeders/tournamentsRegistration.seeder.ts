import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity'; // Ajusta la ruta según tu estructura
import { User } from '../users/entities/user.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';

@Injectable()
export class TournamentsRegistrationSeeder {
  private readonly logger = new Logger(TournamentsRegistrationSeeder.name);

  constructor(
    @InjectRepository(TournamentsRegistration)
    private tournamentsRegistrationRepository: Repository<TournamentsRegistration>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async seed() {
    const users = await this.userRepository.find();
    const tournaments = await this.tournamentRepository.find();

    if (users.length < 2 || tournaments.length === 0) {
      this.logger.warn(
        'At least 2 users and at least one tournament are required to register.',
      );
      return;
    }

    for (const tournament of tournaments) {
      const selectedUsers = this.getRandomUsers(users, 2);

      for (const user of selectedUsers) {
        const existingRegistration =
          await this.tournamentsRegistrationRepository.findOne({
            where: {
              user: { id: user.id },
              tournament: { id: tournament.id },
            },
          });

        if (!existingRegistration) {
          const newRegistration = this.tournamentsRegistrationRepository.create(
            {
              user: { id: user.id } as User,
              tournament: { id: tournament.id } as Tournament,
            },
          );
          await this.tournamentsRegistrationRepository.save(newRegistration);
          this.logger.log(
            `User '${user.id}' has registered for tournament '${tournament.id}'.`,
          );
        } else {
          this.logger.log(
            `User '${user.id}' is already registered for tournament '${tournament.id}'.`,
          );
        }
      }
    }
  }

  private getRandomUsers(users: User[], count: number): User[] {
    const shuffled = users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
