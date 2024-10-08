import { TournamentsRegistration } from 'src/modules/tournamentsregistration/entities/tournamentsregistration.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'uuid', name: 'role_id' })
  roleId: string;

  @OneToMany(() => TournamentsRegistration, (registration) => registration.user)
  tournamentsRegistration: TournamentsRegistration[];
}
