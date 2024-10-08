import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentsRegistrationDto {
  @ApiProperty({
    description: 'The ID of the user registering for the tournament',
    example: 'a12b45c6-789d-012e-345f-6789abcd0123',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The ID of the tournament in which the user is registering',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  tournamentId: string;
}
