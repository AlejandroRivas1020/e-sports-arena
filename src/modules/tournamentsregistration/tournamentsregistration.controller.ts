import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TournamentsregistrationService } from './tournamentsregistration.service';
import { CreateTournamentsRegistrationDto } from './dto/create-tournamentsregistration.dto';
import { UpdateTournamentsRegistrationDto } from './dto/update-tournamentsregistration.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TournamentsRegistration } from './entities/tournamentsregistration.entity';

@ApiTags('Tournaments Registration')
@ApiBearerAuth()
@Controller('tournamentsregistration')
export class TournamentsregistrationController {
  constructor(
    private readonly tournamentsregistrationService: TournamentsregistrationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tournament registration' })
  @ApiResponse({
    status: 201,
    description: 'The registration has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createTournamentsRegistrationDto: CreateTournamentsRegistrationDto,
  ) {
    return this.tournamentsregistrationService.create(
      createTournamentsRegistrationDto,
    );
  }

  @Post(':tournamentId/calculate-scores')
  @ApiOperation({ summary: 'Calculate scores for a specific tournament' })
  @ApiResponse({
    status: 200,
    description: 'Scores calculated successfully',
    type: [TournamentsRegistration],
  })
  @ApiResponse({
    status: 404,
    description: 'Tournament not found',
  })
  async calculateScores(
    @Param('tournamentId') tournamentId: string,
  ): Promise<TournamentsRegistration[]> {
    return this.tournamentsregistrationService.calculateScores(tournamentId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tournament registrations' }) // Description of the operation
  @ApiResponse({
    status: 200,
    description: 'List of all registrations.',
  })
  findAll() {
    return this.tournamentsregistrationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a specific tournament registration by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tournament registration to retrieve',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'The found tournament registration.',
  })
  @ApiResponse({ status: 404, description: 'Registration not found.' })
  findOne(@Param('id') id: string) {
    return this.tournamentsregistrationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tournament registration by ID' }) // Description of the operation
  @ApiParam({
    name: 'id',
    description: 'The ID of the tournament registration to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'The registration has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Registration not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTournamentsRegistrationDto: UpdateTournamentsRegistrationDto,
  ) {
    return this.tournamentsregistrationService.update(
      id,
      updateTournamentsRegistrationDto,
    );
  }
}
