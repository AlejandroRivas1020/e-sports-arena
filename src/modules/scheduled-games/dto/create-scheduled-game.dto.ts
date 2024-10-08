import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduledGameDto {
  @ApiProperty({
    description: 'ID of the tournament',
    type: String,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsNotEmpty()
  @IsUUID()
  tournamentId: string;

  @ApiProperty({
    description: 'ID of player A',
    type: String,
    example: '1d8fcb04-6a40-40bc-9af2-cd9919bf743f',
  })
  @IsNotEmpty()
  @IsUUID()
  playerAId: string;

  @ApiProperty({
    description: 'ID of player B',
    type: String,
    example: '8a7cb87e-2359-4a14-99cb-37e7ed1d95e2',
  })
  @IsNotEmpty()
  @IsUUID()
  playerBId: string;

  @ApiProperty({
    description: 'Date of the scheduled game',
    type: Date,
    example: '2024-12-25T15:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  gameDate: Date;
}
