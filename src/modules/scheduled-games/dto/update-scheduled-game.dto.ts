import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduledGameDto } from './create-scheduled-game.dto';

export class UpdateScheduledGameDto extends PartialType(CreateScheduledGameDto) {}
