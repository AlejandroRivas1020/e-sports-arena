import { Role } from 'src/modules/role/entities/role.entity';
import { TournamentsRegistration } from 'src/modules/tournamentsregistration/entities/tournamentsregistration.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'uuid', name: 'role_id' })
  roleId: string;

  @OneToMany(() => TournamentsRegistration, (registration) => registration.user)
  tournamentsRegistration: TournamentsRegistration[];

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
