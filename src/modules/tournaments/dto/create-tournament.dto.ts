import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({
    description: 'Name of the tournament',
    example: 'Champions League',
  })
  name: string;

  @ApiProperty({
    description: 'brief description of the tournament',
    example: 'football tournament with the champions of the European leagues',
  })
  description: string;

  @ApiProperty({
    description: 'Start date or time of the event',
    example: '2024-12-01T14:00:00',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date or time of the event',
    example: '2024-12-01T16:00:00',
  })
  endDate: Date;

  @ApiProperty({
    description: 'number of players in the tournament',
    example: 10,
  })
  numberPlayers: number;

  @ApiProperty({
    description: 'Number of players registered for the tournament',
    example: 10,
  })
  registeredPlayers: number;
}
