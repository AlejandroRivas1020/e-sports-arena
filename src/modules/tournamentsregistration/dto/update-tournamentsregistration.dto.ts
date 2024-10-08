import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentsRegistrationDto } from './create-tournamentsregistration.dto';

export class UpdateTournamentsRegistrationDto extends PartialType(
  CreateTournamentsRegistrationDto,
) {}
