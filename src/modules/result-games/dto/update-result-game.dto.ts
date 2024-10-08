import { PartialType } from '@nestjs/mapped-types';
import { CreateResultGameDto } from './create-result-game.dto';

export class UpdateResultGameDto extends PartialType(CreateResultGameDto) {}
