import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TournamentsRegistration } from '../tournamentsregistration/entities/tournamentsregistration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TournamentsRegistration])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
