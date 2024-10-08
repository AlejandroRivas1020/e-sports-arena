import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultGameDto {
  @ApiProperty({
    description: 'The ID of the scheduled game',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  scheduledGameId: string;

  @ApiProperty({
    description: 'Score of Team A',
    example: 0,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  scoreTeamA: number;

  @ApiProperty({
    description: 'Score of Team B',
    example: 0,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  scoreTeamB: number;
}
